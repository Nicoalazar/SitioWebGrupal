const searchInput = document.querySelector("[data-member-search]");
const memberCards = [...document.querySelectorAll("[data-member]")];
const emptyState = document.querySelector("[data-empty-state]");

function normalize(text) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase();
}

function filterMembers() {
  const query = normalize(searchInput.value.trim());
  let visibleMembers = 0;

  memberCards.forEach((card) => {
    const matches = normalize(card.dataset.member).includes(query);
    card.hidden = !matches;
    visibleMembers += matches ? 1 : 0;
  });

  emptyState.hidden = visibleMembers > 0;
}

if (searchInput && emptyState) {
  searchInput.addEventListener("input", filterMembers);
}