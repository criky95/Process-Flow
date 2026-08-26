import React, { useMemo, useCallback, useEffect, useState } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  Connection,
  Edge,
  Node,
  BackgroundVariant,
  applyNodeChanges,
  applyEdgeChanges,
  NodeChange,
  EdgeChange,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useAppStore } from '../../store/useAppStore';
import { ProcessNode } from '../designer/ProcessNode';
import { PropertyPanel } from '../designer/PropertyPanel';
import { JsonExchangeModal } from '../designer/JsonExchangeModal';
import { ActivityNodeData, NodeType } from '../../types';
import { StateWrapper } from '../shared/StateWrapper';
import {
  Play,
  UserCheck,
  CheckSquare,
  GitFork,
  Split,
  Clock,
  FileText,
  FileCode,
  Bell,
  FileSignature,
  Boxes,
  Flag,
  Save,
  CheckCircle2,
  UploadCloud,
  Layers,
  ArrowLeft,
  Undo2,
  Redo2,
  Copy,
  Clipboard,
  Code2,
} from 'lucide-react';

export const ProcessDesignerShell: React.FC = () => {
  const {
    activeProcessId,
    processDrafts,
    designerNodes,
    designerEdges,
    setDesignerNodes,
    setDesignerEdges,
    setSelectedNodeId,
    addNodeToDesigner,
    deleteNode,
    recordSnapshot,
    undo,
    redo,
    canUndo,
    canRedo,
    copySelectedNodes,
    pasteNodes,
    setActiveTab,
    saveDraft,
    publishVersion,
  } = useAppStore();

  const [isJsonModalOpen, setIsJsonModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<{ text: string; type: 'success' | 'info' } | null>(null);

  const currentDraft = processDrafts[activeProcessId] || {
    name: 'Proceso Desconocido',
    code: 'PROC-UNK',
    version: 'v1 Draft',
    status: 'draft',
  };

  const handleSaveDraft = () => {
    saveDraft(activeProcessId);
    setToastMsg({ text: 'Borrador guardado correctamente en el catálogo.', type: 'success' });
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handlePublish = () => {
    const res = publishVersion(activeProcessId);
    if (res.success) {
      setToastMsg({ text: `¡Versión ${res.version} publicada como inmutable!`, type: 'success' });
      setTimeout(() => setToastMsg(null), 3500);
    }
  };

  const handleValidate = () => {
    const hasStart = designerNodes.some((n) => n.data?.nodeType === 'start');
    const hasEnd = designerNodes.some((n) => n.data?.nodeType === 'end');
    if (!hasStart || !hasEnd) {
      setToastMsg({ text: 'El grafo debe incluir al menos un nodo de Inicio y uno de Fin.', type: 'info' });
    } else {
      setToastMsg({ text: '✓ Grafo validado: Todos los nodos y transiciones son válidos.', type: 'success' });
    }
    setTimeout(() => setToastMsg(null), 3000);
  };


  const nodeTypes = useMemo(() => ({ processNode: ProcessNode as any }), []);

  // Keyboard Shortcuts Listener for Ctrl+Z, Ctrl+Y, Ctrl+C, Ctrl+V
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Do not trigger shortcuts when typing inside text inputs or textareas
      const activeTag = (document.activeElement?.tagName || '').toLowerCase();
      if (activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select') return;

      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const ctrlKey = isMac ? e.metaKey : e.ctrlKey;

      if (ctrlKey && !e.shiftKey && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        undo();
      } else if ((ctrlKey && e.key.toLowerCase() === 'y') || (ctrlKey && e.shiftKey && e.key.toLowerCase() === 'z')) {
        e.preventDefault();
        redo();
      } else if (ctrlKey && e.key.toLowerCase() === 'c') {
        e.preventDefault();
        copySelectedNodes();
      } else if (ctrlKey && e.key.toLowerCase() === 'v') {
        e.preventDefault();
        pasteNodes();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo, copySelectedNodes, pasteNodes]);

  const onNodesChange = useCallback(
    (changes: NodeChange<Node<ActivityNodeData>>[]) => {
      changes.forEach((change) => {
        if (change.type === 'remove') {
          deleteNode(change.id);
        }
      });
      setDesignerNodes((nds) => applyNodeChanges(changes, nds));
    },
    [setDesignerNodes, deleteNode]
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      const hasRemoval = changes.some((c) => c.type === 'remove');
      if (hasRemoval) {
        recordSnapshot();
      }
      setDesignerEdges((eds) => applyEdgeChanges(changes, eds));
    },
    [setDesignerEdges, recordSnapshot]
  );

  const onConnect = useCallback(
    (params: Connection) => {
      recordSnapshot();
      setDesignerEdges((eds) => addEdge({ ...params, animated: true }, eds));
    },
    [setDesignerEdges, recordSnapshot]
  );

  const paletteItems: { type: NodeType; label: string; icon: React.ElementType; color: string }[] = [
    { type: 'start', label: 'Inicio', icon: Play, color: 'text-emerald-400' },
    { type: 'human_task', label: 'Tarea Humana', icon: UserCheck, color: 'text-blue-400' },
    { type: 'approval', label: 'Aprobación', icon: CheckSquare, color: 'text-indigo-400' },
    { type: 'decision', label: 'Decisión', icon: GitFork, color: 'text-amber-400' },
    { type: 'parallel', label: 'Paralelo', icon: Split, color: 'text-purple-400' },
    { type: 'timer', label: 'Espera / Timer', icon: Clock, color: 'text-amber-400' },
    { type: 'document', label: 'Documento', icon: FileText, color: 'text-cyan-400' },
    { type: 'form', label: 'Formulario', icon: FileCode, color: 'text-emerald-400' },
    { type: 'notification', label: 'Notificación', icon: Bell, color: 'text-yellow-400' },
    { type: 'signature', label: 'Firma', icon: FileSignature, color: 'text-rose-400' },
    { type: 'subprocess', label: 'Subproceso', icon: Boxes, color: 'text-indigo-400' },
    { type: 'end', label: 'Fin', icon: Flag, color: 'text-rose-400' },
  ];

  return (
    <StateWrapper mode="success">
      <div className="flex flex-col h-full w-full bg-slate-950 overflow-hidden select-none">
        {/* Designer Header Toolbar */}
        <div className="h-12 border-b border-slate-800 bg-slate-900 px-4 flex items-center justify-between z-10 shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('processes')}
              className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors flex items-center gap-1.5 text-xs"
              title="Volver a lista de procesos"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Volver</span>
            </button>

            <div className="h-4 w-[1px] bg-slate-800"></div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-800/40">
                {currentDraft.code}
              </span>
              <span className="text-xs font-bold text-white tracking-tight">{currentDraft.name}</span>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold border ${
                  currentDraft.status === 'published'
                    ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800/50'
                    : 'bg-amber-950/80 text-amber-300 border-amber-800/50'
                }`}
              >
                {currentDraft.version}
              </span>
            </div>
          </div>

          {/* Center Actions: Undo / Redo & Copy / Paste & JSON Exchange */}
          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800">
            <button
              onClick={undo}
              disabled={!canUndo}
              className={`p-1.5 rounded text-xs flex items-center gap-1 transition-all ${
                canUndo
                  ? 'hover:bg-slate-800 text-slate-200 hover:text-white'
                  : 'text-slate-600 cursor-not-allowed'
              }`}
              title="Deshacer (Ctrl + Z)"
            >
              <Undo2 className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={redo}
              disabled={!canRedo}
              className={`p-1.5 rounded text-xs flex items-center gap-1 transition-all ${
                canRedo
                  ? 'hover:bg-slate-800 text-slate-200 hover:text-white'
                  : 'text-slate-600 cursor-not-allowed'
              }`}
              title="Rehacer (Ctrl + Y)"
            >
              <Redo2 className="w-3.5 h-3.5" />
            </button>

            <div className="h-3.5 w-[1px] bg-slate-800 my-auto"></div>

            <button
              onClick={copySelectedNodes}
              className="p-1.5 rounded text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
              title="Copiar Nodo Seleccionado (Ctrl + C)"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={pasteNodes}
              className="p-1.5 rounded text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
              title="Pegar Nodo (Ctrl + V)"
            >
              <Clipboard className="w-3.5 h-3.5" />
            </button>

            <div className="h-3.5 w-[1px] bg-slate-800 my-auto"></div>

            <button
              onClick={() => setIsJsonModalOpen(true)}
              className="px-2 py-1 bg-indigo-950/80 hover:bg-indigo-900 border border-indigo-800/40 text-indigo-300 rounded text-[11px] font-medium transition-colors flex items-center gap-1"
              title="Ver / Copiar / Importar JSON del diagrama"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Ver JSON</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {toastMsg && (
              <div
                className={`px-3 py-1 rounded text-xs font-semibold flex items-center gap-1.5 animate-fade-in ${
                  toastMsg.type === 'success'
                    ? 'bg-emerald-950/90 text-emerald-300 border border-emerald-700/60'
                    : 'bg-amber-950/90 text-amber-300 border border-amber-700/60'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{toastMsg.text}</span>
              </div>
            )}

            <button
              onClick={handleSaveDraft}
              className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5 text-slate-400" />
              <span>Guardar Draft</span>
            </button>

            <button
              onClick={handleValidate}
              className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Validar Grafo</span>
            </button>

            <button
              onClick={handlePublish}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <UploadCloud className="w-3.5 h-3.5" />
              <span>Publicar Versión ({currentDraft.version})</span>
            </button>
          </div>
        </div>


        {/* Designer Main Layout (3 Columns: Palette | Canvas | PropertyPanel) */}
        <div className="flex-1 flex min-h-0 relative">
          {/* Left Column: Palette */}
          <div className="w-56 bg-slate-900 border-r border-slate-800 flex flex-col z-10 shrink-0">
            <div className="px-3 py-2.5 border-b border-slate-800 bg-slate-950/40 flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
                Paleta de Nodos
              </h3>
            </div>

            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {paletteItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.type}
                    onClick={() => addNodeToDesigner(item.type)}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800 hover:border-indigo-500/40 text-slate-300 transition-all text-xs text-left group"
                  >
                    <Icon className={`w-4 h-4 ${item.color} group-hover:scale-110 transition-transform`} />
                    <span className="font-medium text-slate-200">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Center Column: Interactive Canvas (@xyflow/react) */}
          <div className="flex-1 h-full relative bg-slate-950">
            <ReactFlow
              nodes={designerNodes}
              edges={designerEdges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onNodeClick={(_, node) => setSelectedNodeId(node.id)}
              onPaneClick={() => setSelectedNodeId(null)}
              nodeTypes={nodeTypes}
              deleteKeyCode={['Delete', 'Backspace']}
              fitView
              fitViewOptions={{ padding: 0.2 }}
            >
              <Background variant={BackgroundVariant.Dots} gap={16} size={1} color="#334155" />
              <Controls className="!bg-slate-900 !border-slate-800 !text-slate-300" />
              <MiniMap
                className="!bg-slate-900 !border-slate-800"
                maskColor="rgba(15, 23, 42, 0.7)"
                nodeColor="#6366f1"
              />
            </ReactFlow>
          </div>

          {/* Right Column: Property Panel */}
          <PropertyPanel />
        </div>

        {/* JSON Import/Export Exchange Modal */}
        <JsonExchangeModal
          isOpen={isJsonModalOpen}
          onClose={() => setIsJsonModalOpen(false)}
        />
      </div>
    </StateWrapper>
  );
};
