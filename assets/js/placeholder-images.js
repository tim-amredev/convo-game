// This script creates placeholder images for scenarios that don't have images yet
document.addEventListener("DOMContentLoaded", () => {
  // Create placeholder images for missing scenario images
  const placeholderImages = {
    kitchen: createPlaceholderImage("Kitchen Remodel", "#2a6fc9"),
    budget: createPlaceholderImage("Budget Discussion", "#4a90e2"),
    competitor: createPlaceholderImage("Competitor Analysis", "#f5a623"),
    closing: createPlaceholderImage("Closing the Sale", "#7ed321"),
    complete: createPlaceholderImage("Project Complete", "#50e3c2"),
    404: createPlaceholderImage("Page Not Found", "#d0021b"),
  }

  // Function to create a placeholder image
  function createPlaceholderImage(text, bgColor) {
    const canvas = document.createElement("canvas")
    canvas.width = 800
    canvas.height = 400

    const ctx = canvas.getContext("2d")

    // Background
    ctx.fillStyle = bgColor
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Text
    ctx.fillStyle = "white"
    ctx.font = "bold 32px Arial"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(text, canvas.width / 2, canvas.height / 2)

    return canvas.toDataURL("image/png")
  }

  // Create the placeholder images directory if it doesn't exist
  function setupPlaceholderImages() {
    // In a real environment, we would save these images to the file system
    // For GitHub Pages, we'll use them directly from JavaScript

    // Check for missing images and replace with placeholders
    document.querySelectorAll("img").forEach((img) => {
      img.addEventListener("error", function () {
        const src = this.src
        const key = src.split("/").pop().split(".")[0].toLowerCase()

        if (placeholderImages[key]) {
          this.src = placeholderImages[key]
        } else {
          // Default placeholder
          this.src = placeholderImages["404"]
        }
      })
    })
  }

  // Setup placeholder images
  setupPlaceholderImages()
})

