// This script creates placeholder images for scenarios that don't have images yet
document.addEventListener("DOMContentLoaded", () => {
  // Create placeholder images for missing scenario images
  const placeholderImages = {
    kitchen: createPlaceholderImage("Kitchen Remodel", "#3498db", "kitchen"),
    budget: createPlaceholderImage("Budget Discussion", "#e67e22", "money-bill"),
    competitor: createPlaceholderImage("Competitor Analysis", "#2ecc71", "users"),
    closing: createPlaceholderImage("Closing the Sale", "#9b59b6", "handshake"),
    complete: createPlaceholderImage("Project Complete", "#1abc9c", "check-circle"),
    404: createPlaceholderImage("Page Not Found", "#e74c3c", "x-circle"),
  }

  // Function to create a placeholder image with an icon
  function createPlaceholderImage(text, bgColor, iconName) {
    const canvas = document.createElement("canvas")
    canvas.width = 800
    canvas.height = 400

    const ctx = canvas.getContext("2d")

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, bgColor)
    gradient.addColorStop(1, adjustColor(bgColor, -30))
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Add pattern
    drawPattern(ctx, canvas.width, canvas.height, bgColor)

    // Text shadow
    ctx.shadowColor = "rgba(0, 0, 0, 0.3)"
    ctx.shadowBlur = 10
    ctx.shadowOffsetX = 2
    ctx.shadowOffsetY = 2

    // Text
    ctx.fillStyle = "white"
    ctx.font = "bold 36px Poppins, sans-serif"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(text, canvas.width / 2, canvas.height / 2 + 50)

    // Reset shadow
    ctx.shadowColor = "transparent"
    ctx.shadowBlur = 0
    ctx.shadowOffsetX = 0
    ctx.shadowOffsetY = 0

    // Draw icon placeholder (in a real implementation, you'd use actual icons)
    drawIconPlaceholder(ctx, canvas.width / 2, canvas.height / 2 - 50, 60, bgColor)

    return canvas.toDataURL("image/png")
  }

  // Function to draw a simple icon placeholder
  function drawIconPlaceholder(ctx, x, y, size, color) {
    ctx.fillStyle = "white"
    ctx.beginPath()
    ctx.arc(x, y, size, 0, Math.PI * 2)
    ctx.fill()

    // Draw a simple icon shape inside (this is just a placeholder)
    ctx.fillStyle = adjustColor(color, 20)
    ctx.beginPath()

    // Simple house icon
    ctx.moveTo(x, y - size / 2)
    ctx.lineTo(x + size / 2, y)
    ctx.lineTo(x + size / 3, y)
    ctx.lineTo(x + size / 3, y + size / 3)
    ctx.lineTo(x - size / 3, y + size / 3)
    ctx.lineTo(x - size / 3, y)
    ctx.lineTo(x - size / 2, y)
    ctx.closePath()
    ctx.fill()
  }

  // Function to draw a pattern
  function drawPattern(ctx, width, height, color) {
    ctx.globalAlpha = 0.1
    ctx.fillStyle = "white"

    const patternSize = 20
    for (let x = 0; x < width; x += patternSize * 2) {
      for (let y = 0; y < height; y += patternSize * 2) {
        ctx.fillRect(x, y, patternSize, patternSize)
        ctx.fillRect(x + patternSize, y + patternSize, patternSize, patternSize)
      }
    }

    ctx.globalAlpha = 1
  }

  // Function to adjust color brightness
  function adjustColor(color, amount) {
    // Convert hex to RGB
    let r, g, b
    if (color.startsWith("#")) {
      const hex = color.slice(1)
      r = Number.parseInt(hex.slice(0, 2), 16)
      g = Number.parseInt(hex.slice(2, 4), 16)
      b = Number.parseInt(hex.slice(4, 6), 16)
    } else {
      return color // Return original if not hex
    }

    // Adjust brightness
    r = Math.max(0, Math.min(255, r + amount))
    g = Math.max(0, Math.min(255, g + amount))
    b = Math.max(0, Math.min(255, b + amount))

    // Convert back to hex
    return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`
  }

  // Check for missing images and replace with placeholders
  function setupPlaceholderImages() {
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

