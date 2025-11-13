document.addEventListener("DOMContentLoaded", () => {
  const entryInput = document.getElementById("entryPrice");
  const slider = document.getElementById("percentChange");
  const percentDisplay = document.getElementById("percentDisplay");

  const newPriceEl = document.getElementById("newPrice");
  const pnlDollarEl = document.getElementById("pnlDollar");
  const pnlPercentEl = document.getElementById("pnlPercent");

  function formatMoney(value) {
    return "$" + value.toFixed(2);
  }

  function updateOutputs() {
    const entry = parseFloat(entryInput.value);
    const pct = parseFloat(slider.value);

    // Update the % display under the slider
    const sign = pct > 0 ? "+" : "";
    percentDisplay.textContent = `${sign}${pct}%`;

    // If no valid entry price yet, clear outputs
    if (isNaN(entry) || entry <= 0) {
      newPriceEl.textContent = "—";
      pnlDollarEl.textContent = "—";
      pnlPercentEl.textContent = "—";

      newPriceEl.className = "value neutral";
      pnlDollarEl.className = "value neutral";
      pnlPercentEl.className = "value neutral";
      return;
    }

    const newPrice = entry * (1 + pct / 100);
    const pnlDollar = newPrice - entry;

    // Update text
    newPriceEl.textContent = formatMoney(newPrice);
    pnlDollarEl.textContent = `${pnlDollar >= 0 ? "+" : "-"}${formatMoney(
      Math.abs(pnlDollar)
    )}`;
    pnlPercentEl.textContent = `${sign}${pct.toFixed(0)}%`;

    // Apply color coding
    const classNameBase = "value ";
    if (pnlDollar > 0) {
      newPriceEl.className = classNameBase + "profit";
      pnlDollarEl.className = classNameBase + "profit";
      pnlPercentEl.className = classNameBase + "profit";
    } else if (pnlDollar < 0) {
      newPriceEl.className = classNameBase + "loss";
      pnlDollarEl.className = classNameBase + "loss";
      pnlPercentEl.className = classNameBase + "loss";
    } else {
      newPriceEl.className = classNameBase + "neutral";
      pnlDollarEl.className = classNameBase + "neutral";
      pnlPercentEl.className = classNameBase + "neutral";
    }
  }

  // Event listeners
  entryInput.addEventListener("input", updateOutputs);
  slider.addEventListener("input", updateOutputs);

  // Initial render
  updateOutputs();
});