document.addEventListener("DOMContentLoaded", () => {
  // Game state
  const gameState = {
    currentScenarioIndex: 0,
    score: 0,
    attempts: 0,
    successes: 0,
    scenarios: [
      {
        id: 1,
        title: "Initial Customer Contact",
        description:
          "A homeowner has contacted you about a potential kitchen remodel. They seem hesitant about the cost.",
        image: "/assets/images/kitchen.jpg",
        options: [
          {
            text: "Start by discussing our financing options to address their cost concerns.",
            feedback: "Not the best approach.",
            explanation: "Starting with financing can make the customer focus even more on cost rather than value.",
            points: 1,
          },
          {
            text: "Ask questions about their vision for their dream kitchen to understand their needs.",
            feedback: "Excellent choice!",
            explanation: "Understanding their needs helps you tailor your presentation to what they value most.",
            points: 5,
          },
          {
            text: "Show them photos of your most luxurious kitchen remodels to impress them.",
            feedback: "This could backfire.",
            explanation:
              "Showing expensive options might increase their cost concerns if you haven't established their budget and preferences.",
            points: 2,
          },
        ],
      },
      {
        id: 2,
        title: "Handling the Budget Objection",
        description:
          "The customer says: 'Your quote is much higher than I expected. I don't think we can afford this.'",
        image: "/assets/images/budget.jpg",
        options: [
          {
            text: "Immediately offer a discount to keep them interested.",
            feedback: "Not recommended.",
            explanation: "Quickly offering discounts devalues your service and reduces profit margins unnecessarily.",
            points: 0,
          },
          {
            text: "Explain that quality materials and craftsmanship come at a premium price.",
            feedback: "Good, but not great.",
            explanation: "While true, this doesn't address their specific concern or demonstrate value.",
            points: 2,
          },
          {
            text: "Break down the quote to show the value of each component and discuss prioritization options.",
            feedback: "Perfect approach!",
            explanation:
              "This shows transparency, helps them understand where their money goes, and offers them control over the process.",
            points: 5,
          },
        ],
      },
      {
        id: 3,
        title: "Competing Quotes",
        description: "The customer mentions they've received a lower quote from a competitor.",
        image: "/assets/images/competitor.jpg",
        options: [
          {
            text: "Point out the flaws in competitors' work and materials.",
            feedback: "Be careful with this approach.",
            explanation: "Negative selling can make you appear unprofessional and desperate.",
            points: 1,
          },
          {
            text: "Match or beat the competitor's price to win the business.",
            feedback: "Not ideal.",
            explanation: "Price matching can start a race to the bottom and hurt your profitability.",
            points: 2,
          },
          {
            text: "Focus on your company's unique value proposition and the benefits they'll receive.",
            feedback: "Excellent strategy!",
            explanation: "This shifts the conversation from price to value and differentiates your offering.",
            points: 5,
          },
        ],
      },
      {
        id: 4,
        title: "Closing the Sale",
        description: "The customer seems interested but is hesitant to commit. They say they need to 'think about it.'",
        image: "/assets/images/closing.jpg",
        options: [
          {
            text: "Tell them the quote is only valid today to create urgency.",
            feedback: "This can backfire.",
            explanation: "False urgency tactics can damage trust and appear manipulative.",
            points: 0,
          },
          {
            text: "Ask what specific concerns they still have that are preventing them from moving forward.",
            feedback: "Great approach!",
            explanation: "This helps identify and address any remaining objections that are holding them back.",
            points: 5,
          },
          {
            text: "Give them space and follow up in a week.",
            feedback: "Not optimal.",
            explanation:
              "While respectful, this misses an opportunity to address concerns in the moment when interest is highest.",
            points: 2,
          },
        ],
      },
      {
        id: 5,
        title: "Post-Sale Follow-Up",
        description: "The project is complete. How do you maximize the value of this customer relationship?",
        image: "/assets/images/complete.jpg",
        options: [
          {
            text: "Move on to the next potential customer to maximize your sales pipeline.",
            feedback: "Missing an opportunity.",
            explanation: "Existing customers are valuable sources of referrals and repeat business.",
            points: 0,
          },
          {
            text: "Ask for a review and referrals if they're satisfied with the work.",
            feedback: "Good thinking!",
            explanation: "Reviews and referrals are powerful tools for growing your business.",
            points: 4,
          },
          {
            text: "Schedule a follow-up visit to ensure satisfaction and discuss potential future projects.",
            feedback: "Excellent strategy!",
            explanation:
              "This shows commitment to customer satisfaction, builds the relationship, and opens the door for additional sales.",
            points: 5,
          },
        ],
      },
    ],
  }

  // Replace placeholder images with actual paths when available
  gameState.scenarios.forEach((scenario) => {
    scenario.image = scenario.image || "/placeholder.svg?height=300&width=500"
  })

  // DOM elements
  const scenarioTitle = document.getElementById("scenario-title")
  const scenarioDescription = document.getElementById("scenario-description")
  const scenarioImage = document.getElementById("scenario-image").querySelector("img")
  const optionsContainer = document.getElementById("options-container")
  const feedbackContainer = document.getElementById("feedback-container")
  const feedbackText = document.getElementById("feedback-text")
  const feedbackExplanation = document.getElementById("feedback-explanation")
  const continueButton = document.getElementById("continue-button")
  const startButton = document.getElementById("start-button")
  const resetButton = document.getElementById("reset-button")
  const helpButton = document.getElementById("help-button")
  const helpModal = document.getElementById("help-modal")
  const closeButton = document.querySelector(".close-button")
  const scoreDisplay = document.getElementById("score")
  const closingPercentageDisplay = document.getElementById("closing-percentage")
  const progressBar = document.getElementById("progress-bar")

  // Load saved game state from localStorage if available
  function loadGameState() {
    const savedState = localStorage.getItem("salesTrainerState")
    if (savedState) {
      const parsedState = JSON.parse(savedState)
      gameState.currentScenarioIndex = parsedState.currentScenarioIndex || 0
      gameState.score = parsedState.score || 0
      gameState.attempts = parsedState.attempts || 0
      gameState.successes = parsedState.successes || 0

      // If game was completed, show summary
      if (gameState.currentScenarioIndex >= gameState.scenarios.length) {
        showGameSummary()
        return
      }

      updateStats()
      updateProgressBar()
    }
  }

  // Save game state to localStorage
  function saveGameState() {
    localStorage.setItem(
      "salesTrainerState",
      JSON.stringify({
        currentScenarioIndex: gameState.currentScenarioIndex,
        score: gameState.score,
        attempts: gameState.attempts,
        successes: gameState.successes,
      }),
    )
  }

  // Start the game
  function startGame() {
    startButton.classList.add("hidden")
    loadGameState()
    if (gameState.currentScenarioIndex < gameState.scenarios.length) {
      showScenario(gameState.currentScenarioIndex)
    }
  }

  // Show a scenario
  function showScenario(index) {
    const scenario = gameState.scenarios[index]

    scenarioTitle.textContent = scenario.title
    scenarioDescription.textContent = scenario.description
    scenarioImage.src = scenario.image
    scenarioImage.alt = scenario.title

    // Clear previous options
    optionsContainer.innerHTML = ""

    // Add new options
    scenario.options.forEach((option, optionIndex) => {
      const button = document.createElement("button")
      button.classList.add("option-button")
      button.textContent = option.text
      button.addEventListener("click", () => selectOption(index, optionIndex))
      optionsContainer.appendChild(button)
    })

    // Hide feedback container
    feedbackContainer.classList.add("hidden")

    updateProgressBar()
  }

  // Handle option selection
  function selectOption(scenarioIndex, optionIndex) {
    const scenario = gameState.scenarios[scenarioIndex]
    const selectedOption = scenario.options[optionIndex]

    // Update game state
    gameState.score += selectedOption.points
    gameState.attempts++

    // If they got a good score, count as a success
    if (selectedOption.points >= 4) {
      gameState.successes++
    }

    // Show feedback
    feedbackText.textContent = selectedOption.feedback
    feedbackExplanation.textContent = selectedOption.explanation
    feedbackContainer.classList.remove("hidden")

    // Hide options
    optionsContainer.classList.add("hidden")

    // Update stats
    updateStats()

    // Save game state
    saveGameState()
  }

  // Continue to next scenario
  function continueToNext() {
    gameState.currentScenarioIndex++

    // Check if game is complete
    if (gameState.currentScenarioIndex >= gameState.scenarios.length) {
      showGameSummary()
    } else {
      // Show next scenario
      showScenario(gameState.currentScenarioIndex)

      // Show options
      optionsContainer.classList.remove("hidden")
    }

    // Save game state
    saveGameState()
  }

  // Show game summary
  function showGameSummary() {
    scenarioTitle.textContent = "Training Complete!"

    const maxScore = gameState.scenarios.reduce((total, scenario) => {
      return total + Math.max(...scenario.options.map((option) => option.points))
    }, 0)

    const percentage = Math.round((gameState.score / maxScore) * 100)

    scenarioDescription.innerHTML = `
      <p>You've completed the Home Remodeling Sales Training!</p>
      <p>Your final score: ${gameState.score} out of a possible ${maxScore} (${percentage}%)</p>
      <p>Your closing percentage: ${calculateClosingPercentage()}%</p>
      <p>Based on your performance, here are some areas to focus on:</p>
      <ul>
        ${getPerformanceFeedback()}
      </ul>
    `

    // Hide options and feedback
    optionsContainer.innerHTML = '<button id="restart-button" class="primary-button">Restart Training</button>'
    document.getElementById("restart-button").addEventListener("click", resetGame)

    feedbackContainer.classList.add("hidden")

    // Update progress bar to show completion
    progressBar.style.width = "100%"
  }

  // Get performance feedback based on score
  function getPerformanceFeedback() {
    const maxScore = gameState.scenarios.reduce((total, scenario) => {
      return total + Math.max(...scenario.options.map((option) => option.points))
    }, 0)

    const percentage = (gameState.score / maxScore) * 100

    const feedback = []

    if (percentage < 50) {
      feedback.push("<li>Focus on understanding customer needs before discussing solutions</li>")
      feedback.push("<li>Practice addressing objections with value propositions rather than discounts</li>")
      feedback.push("<li>Work on identifying closing opportunities</li>")
    } else if (percentage < 80) {
      feedback.push("<li>Continue developing your questioning techniques to better understand customer priorities</li>")
      feedback.push("<li>Practice breaking down quotes to demonstrate value</li>")
      feedback.push("<li>Remember to follow up with customers after project completion</li>")
    } else {
      feedback.push("<li>Excellent work! Consider mentoring other sales representatives</li>")
      feedback.push("<li>Continue focusing on building long-term customer relationships</li>")
      feedback.push("<li>Look for opportunities to upsell complementary services</li>")
    }

    return feedback.join("")
  }

  // Update stats display
  function updateStats() {
    scoreDisplay.textContent = gameState.score
    closingPercentageDisplay.textContent = calculateClosingPercentage() + "%"
  }

  // Calculate closing percentage
  function calculateClosingPercentage() {
    if (gameState.attempts === 0) return 0
    return Math.round((gameState.successes / gameState.attempts) * 100)
  }

  // Update progress bar
  function updateProgressBar() {
    const progress = (gameState.currentScenarioIndex / gameState.scenarios.length) * 100
    progressBar.style.width = `${progress}%`
  }

  // Reset game
  function resetGame() {
    gameState.currentScenarioIndex = 0
    gameState.score = 0
    gameState.attempts = 0
    gameState.successes = 0

    saveGameState()
    startGame()
  }

  // Show help modal
  function showHelp() {
    helpModal.classList.remove("hidden")
  }

  // Hide help modal
  function hideHelp() {
    helpModal.classList.add("hidden")
  }

  // Event listeners
  startButton.addEventListener("click", startGame)
  continueButton.addEventListener("click", () => {
    feedbackContainer.classList.add("hidden")
    optionsContainer.classList.remove("hidden")
    continueToNext()
  })
  resetButton.addEventListener("click", resetGame)
  helpButton.addEventListener("click", showHelp)
  closeButton.addEventListener("click", hideHelp)

  // Close modal when clicking outside of it
  window.addEventListener("click", (event) => {
    if (event.target === helpModal) {
      hideHelp()
    }
  })

  // Initialize game
  updateStats()
  updateProgressBar()
})

