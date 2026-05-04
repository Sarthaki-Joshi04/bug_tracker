import { useState } from "react";
import { useAppData } from "../App";
import EmptyState from "../components/EmptyState";
import FilterToolbar from "../components/FilterToolbar";
import RoleCard from "../components/RoleCard";
import RoleModal from "../components/RoleModal";
import SectionHeading from "../components/SectionHeading";

export default function Roles() {
  const { roles, savedRoles, toggleSavedRole } = useAppData();
  const [query, setQuery] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("All");
  const [selectedMode, setSelectedMode] = useState("All");
  const [activeRole, setActiveRole] = useState(null);

  const teams = [...new Set(roles.map((role) => role.team))];
  const modes = [...new Set(roles.map((role) => role.mode))];

  const filteredRoles = roles.filter((role) => {
    const matchesQuery = [role.title, role.team, role.location, ...role.stack]
      .join(" ")
      .toLowerCase()
      .includes(query.toLowerCase());
    const matchesTeam = selectedTeam === "All" || role.team === selectedTeam;
    const matchesMode = selectedMode === "All" || role.mode === selectedMode;

    return matchesQuery && matchesTeam && matchesMode;
  });

  return (
    <main className="content-wrap py-8">
      <section className="animated-entry">
        <SectionHeading
          copy="Filter live opportunities by team, work mode, or skill focus. Each card reflects mock platform data and supports modal-driven detail browsing."
          eyebrow="Role explorer"
          title="Searchable openings built like a real hiring product"
        />

        <div className="mt-8">
          <FilterToolbar
            modes={modes}
            onModeChange={setSelectedMode}
            onQueryChange={setQuery}
            onTeamChange={setSelectedTeam}
            query={query}
            selectedMode={selectedMode}
            selectedTeam={selectedTeam}
            teams={teams}
          />
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
          <span>{filteredRoles.length} roles match your filters</span>
          <span>{savedRoles.length} roles saved</span>
        </div>
      </section>

      <section className="mt-10">
        {filteredRoles.length ? (
          <div className="grid gap-6 lg:grid-cols-2">
            {filteredRoles.map((role) => (
              <RoleCard
                isSaved={savedRoles.includes(role.id)}
                key={role.id}
                onOpen={setActiveRole}
                onToggleSave={toggleSavedRole}
                role={role}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            copy="Try another team, work mode, or skill keyword to uncover matching openings."
            title="No openings matched the current search"
          />
        )}
      </section>

      <RoleModal
        isSaved={activeRole ? savedRoles.includes(activeRole.id) : false}
        onClose={() => setActiveRole(null)}
        onToggleSave={toggleSavedRole}
        role={activeRole}
      />
    </main>
  );
}
