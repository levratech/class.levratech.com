import './App.css'

function App() {
  return (
    <div className="hero">
      <img src="/vite.svg" alt="LevraTech Logo" className="hero-logo" />
      <h1 className="headline">Unlock AI for Your Business</h1>
      <p className="subtext">Reserve your seat in our free local workshop.</p>
      <form className="signup-form">
        <input type="text" placeholder="Your Name" required />
        <input type="email" placeholder="Your Email" required />
        <button type="submit">Reserve My Seat</button>
      </form>
    </div>
  )
}

export default App
