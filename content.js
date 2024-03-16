/**
 * This is content script that will be injected to every WebGame page.
 */
async function script() {
  console.time("WebGame Rozšíření");
  formatLongNumbers();
  console.timeEnd("WebGame Rozšíření");
}


/**
 * Finds every number longer than 3 digits and adds commas to it.
 * Ignores numbers tarting with #
 */
function formatLongNumbers() {
  const regex = /(?<!\d)(?<!#)(\d{3,})(?!\d)/g;
  const textNodes = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = textNodes.nextNode())) {
    if (node.parentElement.tagName === "SCRIPT") continue;
    node.nodeValue = node.nodeValue.replace(regex, (match) => {
      return match.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    });
  }
}

script().catch(console.warn);
