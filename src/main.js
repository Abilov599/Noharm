document.addEventListener("DOMContentLoaded", function () {
  const csrfTokenMetaTag = document.querySelector('meta[name="csrf-token"]');

  if (!csrfTokenMetaTag) {
    return console.error("Meta tag with name 'csrf-token' not found.");
  }

  const csrfToken = csrfTokenMetaTag.getAttribute("content");

  if (!csrfToken) {
    return console.error("Meta tag with name 'csrf-token' has no content.");
  }

  const tokenInput = document.querySelectorAll('input[name="_token"]');

  tokenInput.forEach((input) => (input.value = csrfToken));
});
