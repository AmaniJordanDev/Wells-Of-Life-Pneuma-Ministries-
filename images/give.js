// ============================================
// WELLS OF LIFE PNEUMA CHURCH
// Give Page - Mobile Money Configuration
// ============================================
//
// 👉 TO UPDATE THE GIVING NUMBER LATER:
// Just change the values in GIVE_CONFIG below.
// Nothing else in this file needs to change.

const GIVE_CONFIG = {
    phoneNumber: "+256 791 588 338",   // Number shown & used for tel: link
    phoneNumberRaw: "+256791588338",   // Same number, no spaces (used for tel: and copy)
    accountName: "Wells of Life Pneuma Ministries"
};

document.addEventListener("DOMContentLoaded", () => {
    const numberEl = document.getElementById("momoNumber");
    const nameEl = document.getElementById("momoName");
    const stepsNumberEls = document.querySelectorAll(".steps-number");
    const momoLink = document.getElementById("momoLink");
    const copyBtn = document.getElementById("copyBtn");
    const copyBtnText = document.getElementById("copyBtnText");

    // Populate the page from GIVE_CONFIG
    if (numberEl) numberEl.textContent = GIVE_CONFIG.phoneNumber;
    if (nameEl) nameEl.textContent = `Account Name: ${GIVE_CONFIG.accountName}`;
    stepsNumberEls.forEach(el => el.textContent = GIVE_CONFIG.phoneNumber);
    if (momoLink) momoLink.setAttribute("href", `tel:${GIVE_CONFIG.phoneNumberRaw}`);

    // Copy-to-clipboard functionality
    if (copyBtn) {
        copyBtn.addEventListener("click", async () => {
            try {
                await navigator.clipboard.writeText(GIVE_CONFIG.phoneNumberRaw);
                copyBtnText.textContent = "Copied!";
                copyBtn.classList.add("copied");
            } catch (err) {
                // Fallback for older browsers
                const tempInput = document.createElement("input");
                tempInput.value = GIVE_CONFIG.phoneNumberRaw;
                document.body.appendChild(tempInput);
                tempInput.select();
                document.execCommand("copy");
                document.body.removeChild(tempInput);
                copyBtnText.textContent = "Copied!";
                copyBtn.classList.add("copied");
            }

            setTimeout(() => {
                copyBtnText.textContent = "Copy Number";
                copyBtn.classList.remove("copied");
            }, 2000);
        });
    }
});