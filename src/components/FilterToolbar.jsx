export default function FilterToolbar({
  query,
  selectedTeam,
  selectedMode,
  onQueryChange,
  onTeamChange,
  onModeChange,
  teams,
  modes,
}) {
  return (
    <div className="glass-panel grid gap-4 p-5 lg:grid-cols-[1.5fr,0.75fr,0.75fr]">
      <div>
        <label className="field-label" htmlFor="role-search">
          Search roles
        </label>
        <input
          className="field-input"
          id="role-search"
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search by role, team, or skill"
          type="text"
          value={query}
        />
      </div>
      <div>
        <label className="field-label" htmlFor="team-filter">
          Team
        </label>
        <select
          className="field-input"
          id="team-filter"
          onChange={(event) => onTeamChange(event.target.value)}
          value={selectedTeam}
        >
          <option value="All">All teams</option>
          {teams.map((team) => (
            <option key={team} value={team}>
              {team}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="field-label" htmlFor="mode-filter">
          Work mode
        </label>
        <select
          className="field-input"
          id="mode-filter"
          onChange={(event) => onModeChange(event.target.value)}
          value={selectedMode}
        >
          <option value="All">All modes</option>
          {modes.map((mode) => (
            <option key={mode} value={mode}>
              {mode}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
