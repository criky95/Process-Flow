# Domain Model

## Entidades

- Organization
- Workspace
- User
- Role
- Department
- ProcessDefinition
- ProcessVersion
- ProcessNode
- ProcessEdge
- ProcessInstance
- TaskDefinition
- TaskInstance
- FormDefinition
- FormSubmission
- Document
- DocumentVersion
- SlaPolicy
- Notification
- Comment
- AuditEvent

## Relaciones principales

```text
ProcessDefinition
1:N
ProcessVersion

ProcessVersion
1:N
ProcessInstance

ProcessInstance
1:N
TaskInstance
```

## Regla

`ProcessInstance.processVersionId` nunca cambia.
