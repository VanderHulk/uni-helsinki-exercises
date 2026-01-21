# Exercise Information

FullStack Open - Part 1

A more complex state, debugging React apps: Exercises 1.12-1.14

App (root component):

-  3 states:
    -  [selected, setSelected] 
        selected holds the index of the anecdote currently diplayed
        setSelected updates the index (selected), which causes React to re-render and show a different anecdote
    -  [voteCount, setVoteCount] 
        voteCount holds an object where each key represents an anecdote index and the value represents the total number of votes for that anecdote
        setVoteCount updates the voteCount state when an anecdote is voted
    -  [hasVoted, setHasVoted] 
        hasVoted is an additional state used to conditionally display "Anecdote/s with the most votes" title after at least one vote has been cast
        setHasVoted updates hasVoted when a user votes
-   voteAnAnecdote function
    -  makes a shallow copy of voteCount to update state without mutating the original object; creating a new object reference allows React to detect the state change and trigger a re-render
    -  updates setVoteCount with the new vote data
    -  updates setHasVoted to true so the title and the anecdote(s) with the most votes are displayed
-  returns JSX which are rendered in the browser

Other components:
Button:
-  accepts onClick, text props
-  returns JSX to render a button that handles user interaction
-  used for collecting votes and selecting the next random anecdote from the array
DisplayAnecdoteVotes:
-  accepts anecdote, totalVotes props
-  returns JSX displaying the anecdote and its number of votes
-  used for displaying both the randomly selected anecdote and the most voted anecdote(s)
DisplayTitle:
-  accepts title prop
-  used for displaying headers for the current anecdote and the most voted anecdote(s)

Functions:
generateVotesTally:
-  generates and returns an object (votesTally) with keys corresponding to the total number of anecdotes, each initialized with a value of 0
generateRandomNumber:
-  generates and returns a random number from 0 to anecdotes.length - 1 to randomly select an anecdote from the array
maxVotes:
-  accepts an object containing the vote counts of each anecdote 
-  uses Math.max to find the highest vote count
-  uses filter to collect the keys (indices) that have the same number of votes as the highest vote
-  returns an empty array if no votes have been cast
displayMostVotes:
-  accepts a vote count object
-  uses maxVotes to identify the anecdote(s) with the highest votes
-  returns JSX displaying the anecdote(s) with the highest vote count