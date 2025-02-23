import { API_LISTINGS } from "../../constants.mjs";
import { optionPost } from "../../api/requestOptions.mjs";

const modal = document.getElementById("bidModal");
const alertBox = document.getElementById("alertMessage");
const alertText = document.getElementById("alertText");

const bidSucessMessage = document.getElementById("bidSucessMessage");
const sucessText = document.getElementById("sucessText");

export function showAlert(message) {
  alertText.textContent = message;
  alertBox.classList.remove("hidden");
  alertBox.classList.remove("translate-x-full");

  setTimeout(() => {
    alertBox.classList.add("translate-x-full");
  }, 3000);
}

function showSuccess(success) {
  // Hide the alert box if it's visible
  alertBox.classList.add("hidden");

  sucessText.textContent = success;
  bidSucessMessage.classList.remove("hidden");
  bidSucessMessage.classList.remove("translate-x-full");

  setTimeout(() => {
    bidSucessMessage.classList.add("translate-x-full");
  }, 2000); // Delay for the success message

  setTimeout(() => {
    location.reload();
  }, 2000); // reload 2 seconds after the success message is shown
}

export async function bidRequest(id) {
  const bidInput = document.getElementById("bidInput");
  const bidAmount = parseFloat(bidInput.value);

  if (!bidAmount || bidAmount <= 0) {
    modal.classList.add("hidden");
    showAlert("Please enter a valid bid amount!");
    return;
  }

  const bidData = { amount: bidAmount };
  const bidOptions = optionPost(bidData);

  try {
    const response = await fetch(`${API_LISTINGS}/${id}/bids`, bidOptions);

    if (!response.ok) {
      const errorData = await response.json();
      console.log("Error data:", errorData);
      throw new Error(
        `${errorData.statusCode}: ${errorData.status}. ${errorData.errors[0].message}`
      );
    }

    const data = await response.json();
    console.log("Bid submitted successfully:", data);

    // Make sure to update sessionStorage and display only once
    showSuccess("Congratulations! You have placed your bid.");
    sessionStorage.setItem("lastBid", bidAmount);

    modal.classList.add("hidden");
    return data;
  } catch (error) {
    console.error("Error placing bid:", error);
    showAlert(error.message);
    modal.classList.add("hidden");
    return null;
  }
}

const urlParams = new URLSearchParams(window.location.search);
const itemId = urlParams.get("id");

const observer = new MutationObserver(() => {
  const bidButton = document.getElementById("confirmBid");

  if (bidButton) {
    bidButton.addEventListener("click", () => {
      bidRequest(itemId).then((response) => {
        if (response) {
          console.log("Bid placed successfully:", response);
          modal.classList.add("hidden");
        } else {
          console.log("Bid failed.");
        }
      });
    });

    observer.disconnect();
  }
});

observer.observe(document.body, { childList: true, subtree: true });
