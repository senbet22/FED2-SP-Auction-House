import { API_LISTINGS } from "../../constants.mjs";
import { optionPost } from "../../api/requestOptions.mjs";

export async function bidRequest(id) {
  const bidInput = document.getElementById("bidInput");
  const bidAmount = parseFloat(bidInput.value);

  if (!bidAmount || bidAmount <= 0) {
    alert("Please enter a valid bid amount!");
    return;
  }

  const biddata = {
    amount: bidAmount,
  };

  const bidOptions = optionPost(biddata);
  console.log(optionPost(biddata.token));

  try {
    const response = await fetch(`${API_LISTINGS}/${id}/bids`, bidOptions); // Send the request

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`); // Handle response errors
    }

    const data = await response.json();
    console.log("Bid submitted successfully:", data);
    return data;
  } catch (error) {
    console.error("Error fetching item data:", error);
    return null;
  }
}

const urlParams = new URLSearchParams(window.location.search);
const itemId = urlParams.get("id");

const observer = new MutationObserver(() => {
  const bidButton = document.getElementById("bidButton");

  if (bidButton) {
    bidButton.addEventListener("click", () => {
      bidRequest(itemId).then((response) => {
        if (response) {
          console.log("Bid placed successfully:", response);
        } else {
          console.log("Bid failed.");
        }
      });
    });

    observer.disconnect();
  }
});

observer.observe(document.body, { childList: true, subtree: true });
