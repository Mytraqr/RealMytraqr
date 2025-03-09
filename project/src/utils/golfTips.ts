export const golfTips = [
  // Driving Tips
  {
    category: 'driving',
    tip: "Practice the alignment stick drill: Place two alignment sticks parallel on the ground - one for your target line and one for your feet. This helps groove a square setup.",
    focus: "Setup and Alignment"
  },
  {
    category: 'driving',
    tip: "Work on tempo with the 'whoosh drill': Practice swinging with just your trail arm, focusing on creating speed at the bottom of the swing.",
    focus: "Swing Speed"
  },
  {
    category: 'driving',
    tip: "Try the towel drill: Place a towel 6 inches behind your ball and practice swinging without hitting it to improve your attack angle.",
    focus: "Contact"
  },

  // Approach Shot Tips
  {
    category: 'approach',
    tip: "Practice the 9-ball drill: Hit 9 balls to the same target, trying to create different trajectories - low, medium, and high with each club.",
    focus: "Shot Shaping"
  },
  {
    category: 'approach',
    tip: "Work on distance control by practicing the ladder drill: Place targets at 10-yard increments and hit to each one progressively.",
    focus: "Distance Control"
  },
  {
    category: 'approach',
    tip: "Use the clock drill: Imagine your target as 12 o'clock and practice hitting shots to 11, 12, and 1 to improve accuracy.",
    focus: "Accuracy"
  },

  // Short Game Tips
  {
    category: 'shortGame',
    tip: "Practice the coin drill: Place a coin as your target and chip to it from different lies and distances.",
    focus: "Precision"
  },
  {
    category: 'shortGame',
    tip: "Try the hula hoop drill: Place a hula hoop around your target and practice landing chips within the circle.",
    focus: "Landing Zone Control"
  },
  {
    category: 'shortGame',
    tip: "Work on the clock drill for chipping: Place balls in a circle around a hole and practice hitting different length chips.",
    focus: "Versatility"
  },

  // Bunker Tips
  {
    category: 'bunker',
    tip: "Practice the line drill: Draw a line in the sand and focus on hitting the sand behind it to improve your entry point.",
    focus: "Entry Point"
  },
  {
    category: 'bunker',
    tip: "Use the splash drill: Place a club length of sand between you and your target, focusing on splashing the sand onto the club.",
    focus: "Sand Control"
  },
  {
    category: 'bunker',
    tip: "Try the buried lie drill: Practice hitting shots with the ball placed at different depths in the sand.",
    focus: "Versatility"
  },

  // Putting Tips
  {
    category: 'putting',
    tip: "Practice the gate drill: Set up two tees just wider than your putter head and practice hitting putts through the gate.",
    focus: "Stroke Path"
  },
  {
    category: 'putting',
    tip: "Work on speed control with the ladder drill: Place balls at 10, 20, and 30 feet and try to get each putt to stop at the hole.",
    focus: "Speed Control"
  },
  {
    category: 'putting',
    tip: "Use the clock drill: Place 12 balls in a circle around the hole at 3-foot intervals and try to make all putts consecutively.",
    focus: "Breaking Putts"
  },

  // Mental Game Tips
  {
    category: 'mental',
    tip: "Practice visualization: Before each shot, take 10 seconds to clearly picture the shot shape and landing spot you want.",
    focus: "Pre-shot Routine"
  },
  {
    category: 'mental',
    tip: "Work on breathing: Take three deep breaths before crucial shots to calm your nerves and improve focus.",
    focus: "Stress Management"
  },
  {
    category: 'mental',
    tip: "Use positive self-talk: Replace negative thoughts with specific, actionable swing thoughts.",
    focus: "Confidence Building"
  },

  // Course Management Tips
  {
    category: 'strategy',
    tip: "Practice playing for position: Rather than always aiming at flags, work on leaving yourself uphill putts.",
    focus: "Course Strategy"
  },
  {
    category: 'strategy',
    tip: "Work on your miss: Identify your common miss and practice playing for it during practice rounds.",
    focus: "Game Planning"
  }
];

export function getRandomTip(): string {
  return golfTips[Math.floor(Math.random() * golfTips.length)].tip;
}

export function getTipsByCategory(category: string): string[] {
  return golfTips
    .filter(tip => tip.category === category)
    .map(tip => tip.tip);
}