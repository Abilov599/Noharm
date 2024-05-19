document.addEventListener("DOMContentLoaded", function () {
  const csrfTokenMetaTag = document.querySelector('meta[name="csrf-token"]');

  if (!csrfTokenMetaTag) return;

  const csrfToken = csrfTokenMetaTag.getAttribute("content");

  if (!csrfToken) return;

  const tokenInput = document.querySelectorAll('input[name="_token"]');

  tokenInput.forEach((input) => (input.value = csrfToken));
});
