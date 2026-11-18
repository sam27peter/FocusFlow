import { useState } from 'react'
import './App.css'

const starterTasks = [
  {
    id: 1,
    name: 'Review biology notes',
    subject: 'Biology',
    time: '9:00 AM',
    done: true,
  },
  {
    id: 2,
    name: 'Practice algebra problems',
    subject: 'Math',
    time: '10:30 AM',
    done: false,
  },
  {
    id: 3,
    name: 'Read history chapter 4',
    subject: 'History',
    time: '1:00 PM',
    done: false,
  },
]

function App() {
  const [tasks, setTasks] = useState(starterTasks)
  const [newTaskName, setNewTaskName] = useState('')
  const [newTaskTime, setNewTaskTime] = useState('')

  function toggleTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, done: !task.done } : task,
      ),
    )
  }

  function addTask(event) {
    event.preventDefault()

    const name = newTaskName.trim()
    if (!name || !newTaskTime) return

    const formattedTime = new Date(
      `2000-01-01T${newTaskTime}`,
    ).toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
    })

    setTasks((currentTasks) => [
      ...currentTasks,
      {
        id: Date.now(),
        name,
        subject: 'Study',
        time: formattedTime,
        done: false,
      },
    ])

    setNewTaskName('')
    setNewTaskTime('')
  }

  const completedTasks = tasks.filter((task) => task.done).length
  const progress =
    tasks.length === 0 ? 0 : Math.round((completedTasks / tasks.length) * 100)

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#" aria-label="FocusFlow home">
          <span className="brand-mark">F</span>
          FocusFlow
        </a>

        <nav aria-label="Main navigation">
          <a href="#features">Features</a>
          <a href="#how-it-works">How it works</a>
        </nav>

        <a className="header-button" href="#planner">
          Try the planner
        </a>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">A calmer way to study</p>
          <h1>Make time for what matters.</h1>
          <p className="hero-description">
            Add your study tasks, choose when to work on them, and track your
            progress one focused session at a time.
          </p>
          <a className="primary-button" href="#planner">
            Plan my study time <span aria-hidden="true">→</span>
          </a>
          <p className="small-note">Your next focused session starts here.</p>
        </div>

        <section
          className="planner-card"
          id="planner"
          aria-label="Study planner"
        >
          <div className="planner-heading">
            <div>
              <p className="card-label">YOUR PLAN</p>
              <h2>Today, at your pace</h2>
            </div>
            <span className="date-pill">MON · 17</span>
          </div>

          <div className="progress-row">
            <span>
              {completedTasks} of {tasks.length} tasks complete
            </span>
            <span>{progress}%</span>
          </div>

          <div
            className="progress-track"
            role="progressbar"
            aria-label="Daily task progress"
            aria-valuenow={completedTasks}
            aria-valuemin="0"
            aria-valuemax={tasks.length}
          >
            <span style={{ width: `${progress}%` }} />
          </div>

          <form className="add-task-form" onSubmit={addTask}>
            <input
              aria-label="Task name"
              placeholder="What do you need to study?"
              value={newTaskName}
              onChange={(event) => setNewTaskName(event.target.value)}
              required
            />
            <input
              aria-label="Study time"
              type="time"
              value={newTaskTime}
              onChange={(event) => setNewTaskTime(event.target.value)}
              required
            />
            <button type="submit">Add</button>
          </form>

          <div className="task-list">
            {tasks.map((task) => (
              <label
                className={`task ${task.done ? 'task-done' : ''}`}
                key={task.id}
              >
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => toggleTask(task.id)}
                />
                <span className="task-text">
                  <strong>{task.name}</strong>
                  <small>{task.subject}</small>
                </span>
                <span className="task-time">{task.time}</span>
              </label>
            ))}
          </div>

          <p className="card-footer">Small steps add up. Keep going ✨</p>
        </section>
      </section>

      <section className="info-section" id="features">
        <p className="eyebrow">Less overwhelm, more momentum</p>
        <h2>Everything you need to get started.</h2>

        <div className="feature-grid">
          <article className="feature">
            <span className="feature-icon" aria-hidden="true">
              ✎
            </span>
            <h3>Capture your tasks</h3>
            <p>
              Keep assignments and study goals together in one simple list.
            </p>
          </article>

          <article className="feature">
            <span className="feature-icon" aria-hidden="true">
              ◷
            </span>
            <h3>Choose a time</h3>
            <p>Give each task a place in your day, one session at a time.</p>
          </article>

          <article className="feature">
            <span className="feature-icon" aria-hidden="true">
              ↗
            </span>
            <h3>See your progress</h3>
            <p>Check tasks off and see the effort you’ve already put in.</p>
          </article>
        </div>
      </section>

      <section className="how-section" id="how-it-works">
        <p className="eyebrow">A simple rhythm</p>
        <h2>Plan a little. Focus a little. Repeat.</h2>
        <p>
          Add a task, choose when you’ll work on it, then check it off when
          you’re done.
        </p>
        <a className="primary-button" href="#planner">
          Try the planner <span aria-hidden="true">→</span>
        </a>
      </section>

      <footer>
        <a className="brand" href="#">
          <span className="brand-mark">F</span>
          FocusFlow
        </a>
        <span>Make room for your next good study session.</span>
      </footer>
    </main>
  )
}

export default App