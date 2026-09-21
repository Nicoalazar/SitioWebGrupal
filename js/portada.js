const searchInput = document.querySelector("[data-member-search]");
const memberCards = [...document.querySelectorAll("[data-member]")];
const emptyState = document.querySelector("[data-empty-state]");

function filterMembers() {
  const query = searchInput.value.trim().toLocaleLowerCase();
  let visibleMembers = 0;

  memberCards.forEach((card) => {
    const matches = card.dataset.member.includes(query);
    card.hidden = !matches;
    visibleMembers += matches ? 1 : 0;
  });

  emptyState.hidden = visibleMembers > 0;
}

if (searchInput && emptyState) {
  searchInput.addEventListener("input", filterMembers);
}