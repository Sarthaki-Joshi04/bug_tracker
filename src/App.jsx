import { useMemo, useState } from "react";

const statuses = ["To Do", "In Progress", "Done"];
const priorities = ["Critical", "High", "Medium", "Low"];

const seedMembers = [
  { id: "u1", name: "Aarav Mehta", role: "Manager", initials: "AM" },
  { id: "u2", name: "Nisha Rao", role: "Developer", initials: "NR" },
  { id: "u3", name: "Kabir Shah", role: "Developer", initials: "KS" },
  { id: "u4", name: "Meera Iyer", role: "QA", initials: "MI" },
];

const seedProjects = [
  {
    id: "p1",
    name: "Atlas CRM",
    key: "ATL",
    description: "Customer dashboard, reporting, and workflow automation.",
    members: ["u1", "u2", "u3", "u4"],
  },
  {
    id: "p2",
    name: "Mobile Checkout",
    key: "PAY",
    description: "Payments, refunds, and fraud review for mobile buyers.",
    members: ["u1", "u2", "u4"],
  },
];

const seedTickets = [
  {
    id: "t1",
    projectId: "p1",
    title: "Account export fails for filtered reports",
    description: "CSV export returns all records when date filters are applied.",
    type: "Bug",
    priority: "Critical",
    status: "To Do",
    assigneeId: "u4",
    reporter: "Aarav Mehta",
    createdAt: "2026-05-01",
    comments: [
      { id: "c1", author: "Meera Iyer", text: "Reproduced in staging with the May dataset.", time: "09:20" },
    ],
  },
  {
    id: "t2",
    projectId: "p1",
    title: "Add saved views to the project dashboard",
    description: "Managers need a quick way to reuse filter combinations.",
    type: "Feature",
    priority: "High",
    status: "In Progress",
    assigneeId: "u2",
    reporter: "Nisha Rao",
    createdAt: "2026-04-28",
    comments: [],
  },
  {
    id: "t3",
    projectId: "p1",
    title: "Tighten viewer permission checks",
    description: "Viewers can open the team settings route through a direct URL.",
    type: "Task",
    priority: "Medium",
    status: "Done",
    assigneeId: "u3",
    reporter: "Kabir Shah",
    createdAt: "2026-04-25",
    comments: [
      { id: "c2", author: "Kabir Shah", text: "Merged with a route guard and API check.", time: "15:45" },
    ],
  },
  {
    id: "t4",
    projectId: "p2",
    title: "Refund timeline has inconsistent timestamps",
    description: "Timeline cards switch between UTC and local time after refresh.",
    type: "Bug",
    priority: "High",
    status: "To Do",
    assigneeId: "u4",
    reporter: "Aarav Mehta",
    createdAt: "2026-05-02",
    comments: [],
  },
];

function useStoredState(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const updateValue = (nextValue) => {
    setValue((current) => {
      const resolved = typeof nextValue === "function" ? nextValue(current) : nextValue;
      window.localStorage.setItem(key, JSON.stringify(resolved));
      return resolved;
    });
  };

  return [value, updateValue];
}

function makeId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function getMember(members, id) {
  return members.find((member) => member.id === id) || members[0];
}

function App() {
  const [members] = useState(seedMembers);
  const [projects, setProjects] = useStoredState("tracker-projects", seedProjects);
  const [tickets, setTickets] = useStoredState("tracker-tickets", seedTickets);
  const [session, setSession] = useStoredState("tracker-session", null);
  const [activeProjectId, setActiveProjectId] = useStoredState("tracker-active-project", seedProjects[0].id);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [assigneeFilter, setAssigneeFilter] = useState("All");
  const [ticketModal, setTicketModal] = useState(null);
  const [projectDraft, setProjectDraft] = useState({ name: "", key: "", description: "" });
  const [dragTicketId, setDragTicketId] = useState("");

  const activeProject = projects.find((project) => project.id === activeProjectId) || projects[0];

  const projectTickets = useMemo(
    () => tickets.filter((ticket) => ticket.projectId === activeProject.id),
    [activeProject.id, tickets]
  );

  const visibleTickets = useMemo(() => {
    const lowerQuery = query.trim().toLowerCase();

    return projectTickets.filter((ticket) => {
      const member = getMember(members, ticket.assigneeId);
      const matchesQuery =
        !lowerQuery ||
        [ticket.title, ticket.description, ticket.type, member.name].some((value) =>
          value.toLowerCase().includes(lowerQuery)
        );
      const matchesStatus = statusFilter === "All" || ticket.status === statusFilter;
      const matchesPriority = priorityFilter === "All" || ticket.priority === priorityFilter;
      const matchesAssignee = assigneeFilter === "All" || ticket.assigneeId === assigneeFilter;
      return matchesQuery && matchesStatus && matchesPriority && matchesAssignee;
    });
  }, [assigneeFilter, members, priorityFilter, projectTickets, query, statusFilter]);

  const stats = useMemo(() => {
    const done = projectTickets.filter((ticket) => ticket.status === "Done").length;
    const critical = projectTickets.filter((ticket) => ticket.priority === "Critical").length;
    const active = projectTickets.length - done;
    const progress = projectTickets.length ? Math.round((done / projectTickets.length) * 100) : 0;
    return { active, critical, progress, total: projectTickets.length };
  }, [projectTickets]);

  const signIn = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get("name").trim();
    const email = data.get("email").trim();
    if (!name || !email) return;
    setSession({ name, email, role: "Manager" });
  };

  const saveTicket = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = {
      title: data.get("title").trim(),
      description: data.get("description").trim(),
      type: data.get("type"),
      priority: data.get("priority"),
      status: data.get("status"),
      assigneeId: data.get("assigneeId"),
    };

    if (!payload.title || !payload.description) return;

    if (ticketModal?.ticket) {
      setTickets((current) =>
        current.map((ticket) => (ticket.id === ticketModal.ticket.id ? { ...ticket, ...payload } : ticket))
      );
    } else {
      setTickets((current) => [
        {
          ...payload,
          id: makeId("ticket"),
          projectId: activeProject.id,
          reporter: session?.name || "Project Manager",
          createdAt: new Date().toISOString().slice(0, 10),
          comments: [],
        },
        ...current,
      ]);
    }

    setTicketModal(null);
  };

  const deleteTicket = (ticketId) => {
    setTickets((current) => current.filter((ticket) => ticket.id !== ticketId));
    setTicketModal(null);
  };

  const moveTicket = (ticketId, status) => {
    setTickets((current) => current.map((ticket) => (ticket.id === ticketId ? { ...ticket, status } : ticket)));
  };

  const addComment = (ticketId, text) => {
    const cleanText = text.trim();
    if (!cleanText) return;

    setTickets((current) =>
      current.map((ticket) =>
        ticket.id === ticketId
          ? {
              ...ticket,
              comments: [
                ...ticket.comments,
                {
                  id: makeId("comment"),
                  author: session?.name || "Team Member",
                  text: cleanText,
                  time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                },
              ],
            }
          : ticket
      )
    );
  };

  const createProject = (event) => {
    event.preventDefault();
    if (!projectDraft.name.trim() || !projectDraft.key.trim()) return;

    const project = {
      id: makeId("project"),
      name: projectDraft.name.trim(),
      key: projectDraft.key.trim().slice(0, 4).toUpperCase(),
      description: projectDraft.description.trim() || "New project workspace.",
      members: members.map((member) => member.id),
    };

    setProjects((current) => [...current, project]);
    setActiveProjectId(project.id);
    setProjectDraft({ name: "", key: "", description: "" });
  };

  if (!session) {
    return <LoginScreen onSubmit={signIn} />;
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-lockup">
          <span className="brand-mark">BT</span>
          <div>
            <strong>BugTrack</strong>
            <small>Issue command center</small>
          </div>
        </div>

        <nav className="nav-stack" aria-label="Primary">
          <a href="#board">Board</a>
          <a href="#tickets">Issues</a>
          <a href="#team">Team</a>
        </nav>

        <form className="new-project" onSubmit={createProject}>
          <label>
            Project name
            <input
              value={projectDraft.name}
              onChange={(event) => setProjectDraft((draft) => ({ ...draft, name: event.target.value }))}
              placeholder="Internal tools"
            />
          </label>
          <label>
            Key
            <input
              value={projectDraft.key}
              onChange={(event) => setProjectDraft((draft) => ({ ...draft, key: event.target.value }))}
              placeholder="INT"
            />
          </label>
          <label>
            Description
            <textarea
              value={projectDraft.description}
              onChange={(event) => setProjectDraft((draft) => ({ ...draft, description: event.target.value }))}
              placeholder="What this workspace owns"
            />
          </label>
          <button type="submit">Create project</button>
        </form>
      </aside>

      <main className="workspace">
        <header className="topbar">
          <div>
            <p className="eyebrow">MERN-ready project management app</p>
            <h1>{activeProject.name}</h1>
            <p>{activeProject.description}</p>
          </div>
          <div className="account-card">
            <span>{session.name.slice(0, 2).toUpperCase()}</span>
            <div>
              <strong>{session.name}</strong>
              <small>{session.role}</small>
            </div>
            <button type="button" onClick={() => setSession(null)}>
              Sign out
            </button>
          </div>
        </header>

        <section className="control-strip">
          <label>
            Project
            <select value={activeProject.id} onChange={(event) => setActiveProjectId(event.target.value)}>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.key} - {project.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Search
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Title, assignee, type" />
          </label>
          <label>
            Status
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
              <option>All</option>
              {statuses.map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>
          </label>
          <label>
            Priority
            <select value={priorityFilter} onChange={(event) => setPriorityFilter(event.target.value)}>
              <option>All</option>
              {priorities.map((priority) => (
                <option key={priority}>{priority}</option>
              ))}
            </select>
          </label>
          <label>
            Assignee
            <select value={assigneeFilter} onChange={(event) => setAssigneeFilter(event.target.value)}>
              <option value="All">All</option>
              {members.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </select>
          </label>
          <button className="primary-action" type="button" onClick={() => setTicketModal({ mode: "create" })}>
            New issue
          </button>
        </section>

        <section className="stats-grid" aria-label="Project statistics">
          <StatCard label="Open work" value={stats.active} detail={`${stats.total} total issues`} />
          <StatCard label="Critical bugs" value={stats.critical} detail="Priority escalation queue" />
          <StatCard label="Completed" value={`${stats.progress}%`} detail="Done across this project" />
          <StatCard label="Team" value={activeProject.members.length} detail="Members assigned" />
        </section>

        <section className="board-section" id="board">
          <div className="section-heading">
            <div>
              <h2>Kanban board</h2>
              <p>Drag cards between columns or open an issue for full details.</p>
            </div>
            <span>{visibleTickets.length} visible</span>
          </div>

          <div className="kanban-board">
            {statuses.map((status) => (
              <div
                className="kanban-column"
                key={status}
                onDragOver={(event) => event.preventDefault()}
                onDrop={() => {
                  if (dragTicketId) moveTicket(dragTicketId, status);
                  setDragTicketId("");
                }}
              >
                <div className="column-header">
                  <h3>{status}</h3>
                  <span>{visibleTickets.filter((ticket) => ticket.status === status).length}</span>
                </div>
                <div className="ticket-stack">
                  {visibleTickets
                    .filter((ticket) => ticket.status === status)
                    .map((ticket) => (
                      <TicketCard
                        key={ticket.id}
                        ticket={ticket}
                        member={getMember(members, ticket.assigneeId)}
                        onDragStart={() => setDragTicketId(ticket.id)}
                        onOpen={() => setTicketModal({ mode: "edit", ticket })}
                      />
                    ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="issue-table-section" id="tickets">
          <div className="section-heading">
            <div>
              <h2>Issue list</h2>
              <p>Sortable table-style view for triage and reviews.</p>
            </div>
          </div>
          <div className="issue-list">
            {visibleTickets.map((ticket) => (
              <button className="issue-row" key={ticket.id} type="button" onClick={() => setTicketModal({ mode: "edit", ticket })}>
                <span className={`priority-dot ${ticket.priority.toLowerCase()}`} />
                <strong>{ticket.title}</strong>
                <small>{ticket.type}</small>
                <small>{ticket.status}</small>
                <small>{getMember(members, ticket.assigneeId).name}</small>
              </button>
            ))}
          </div>
        </section>

        <section className="team-section" id="team">
          <div className="section-heading">
            <div>
              <h2>Team and access</h2>
              <p>Role-aware members ready for assignment and permission flows.</p>
            </div>
          </div>
          <div className="team-grid">
            {members.map((member) => (
              <article className="member-card" key={member.id}>
                <span>{member.initials}</span>
                <div>
                  <strong>{member.name}</strong>
                  <small>{member.role}</small>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      {ticketModal ? (
        <TicketModal
          members={members}
          onAddComment={addComment}
          onClose={() => setTicketModal(null)}
          onDelete={deleteTicket}
          onSave={saveTicket}
          ticket={ticketModal.ticket}
        />
      ) : null}
    </div>
  );
}

function LoginScreen({ onSubmit }) {
  return (
    <main className="login-screen">
      <section className="login-panel">
        <div>
          <p className="eyebrow">Project management app</p>
          <h1>Track bugs, ship faster, keep every handoff visible.</h1>
          <p>
            A Jira-inspired workspace with projects, Kanban tickets, assignees, filters, comments, and role-ready
            collaboration.
          </p>
        </div>
        <form onSubmit={onSubmit}>
          <label>
            Name
            <input name="name" placeholder="Priya Sharma" />
          </label>
          <label>
            Email
            <input name="email" placeholder="priya@company.com" type="email" />
          </label>
          <button type="submit">Enter workspace</button>
        </form>
      </section>
    </main>
  );
}

function StatCard({ detail, label, value }) {
  return (
    <article className="stat-card">
      <small>{label}</small>
      <strong>{value}</strong>
      <span>{detail}</span>
    </article>
  );
}

function TicketCard({ member, onDragStart, onOpen, ticket }) {
  return (
    <article className="ticket-card" draggable onDragStart={onDragStart}>
      <button type="button" onClick={onOpen}>
        <div className="ticket-meta">
          <span className={`priority-badge ${ticket.priority.toLowerCase()}`}>{ticket.priority}</span>
          <span>{ticket.type}</span>
        </div>
        <h4>{ticket.title}</h4>
        <p>{ticket.description}</p>
        <div className="ticket-footer">
          <span className="avatar">{member.initials}</span>
          <small>{ticket.comments.length} comments</small>
        </div>
      </button>
    </article>
  );
}

function TicketModal({ members, onAddComment, onClose, onDelete, onSave, ticket }) {
  const [comment, setComment] = useState("");
  const selectedTicket = ticket || {
    title: "",
    description: "",
    type: "Bug",
    priority: "Medium",
    status: "To Do",
    assigneeId: members[0].id,
    comments: [],
  };

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <section className="ticket-modal">
        <div className="modal-header">
          <div>
            <p className="eyebrow">{ticket ? "Edit issue" : "Create issue"}</p>
            <h2>{ticket ? ticket.title : "New project ticket"}</h2>
          </div>
          <button type="button" onClick={onClose}>
            Close
          </button>
        </div>

        <form className="ticket-form" onSubmit={onSave}>
          <label>
            Title
            <input defaultValue={selectedTicket.title} name="title" placeholder="Short issue summary" />
          </label>
          <label className="span-2">
            Description
            <textarea defaultValue={selectedTicket.description} name="description" placeholder="Steps, expected result, context" />
          </label>
          <label>
            Type
            <select defaultValue={selectedTicket.type} name="type">
              <option>Bug</option>
              <option>Feature</option>
              <option>Task</option>
            </select>
          </label>
          <label>
            Priority
            <select defaultValue={selectedTicket.priority} name="priority">
              {priorities.map((priority) => (
                <option key={priority}>{priority}</option>
              ))}
            </select>
          </label>
          <label>
            Status
            <select defaultValue={selectedTicket.status} name="status">
              {statuses.map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>
          </label>
          <label>
            Assignee
            <select defaultValue={selectedTicket.assigneeId} name="assigneeId">
              {members.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </select>
          </label>
          <div className="modal-actions span-2">
            {ticket ? (
              <button className="danger-action" type="button" onClick={() => onDelete(ticket.id)}>
                Delete
              </button>
            ) : null}
            <button type="submit">Save issue</button>
          </div>
        </form>

        {ticket ? (
          <div className="comments-panel">
            <h3>Comments</h3>
            <div className="comments-list">
              {ticket.comments.length ? (
                ticket.comments.map((item) => (
                  <article key={item.id}>
                    <strong>{item.author}</strong>
                    <p>{item.text}</p>
                    <small>{item.time}</small>
                  </article>
                ))
              ) : (
                <p className="empty-copy">No comments yet.</p>
              )}
            </div>
            <form
              className="comment-form"
              onSubmit={(event) => {
                event.preventDefault();
                onAddComment(ticket.id, comment);
                setComment("");
              }}
            >
              <input value={comment} onChange={(event) => setComment(event.target.value)} placeholder="Add a teammate update" />
              <button type="submit">Comment</button>
            </form>
          </div>
        ) : null}
      </section>
    </div>
  );
}

export default App;
