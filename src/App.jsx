import './App.css'

function App() {
	return (
		<div className="hero">
			<h1 className="headline noir-headline">Unlock AI for Your Business</h1>
			<p className="subtext noir-subtext">
				Reserve your seat in our free local workshop. Walk away with real
				options even if tech isn’t your thing.
			</p>
			<div className="supporting noir-supporting">
				Workshops held at Savage Library, Large Meeting Room.
				<br />
				<span className="limited">
					Space is limited!
					<br />
					pick your date and claim your seat.
				</span>
			</div>
			<form className="signup-form noir-form">
				<label htmlFor="name" className="visually-hidden">
					Name
				</label>
				<input
					id="name"
					type="text"
					placeholder="Your Name"
					required
					autoComplete="name"
				/>
				<label htmlFor="email" className="visually-hidden">
					Email
				</label>
				<input
					id="email"
					type="email"
					placeholder="Your Email"
					required
					autoComplete="email"
				/>
				<label htmlFor="date" className="visually-hidden">
					Workshop Date
				</label>
				<select id="date" required defaultValue="">
					<option value="" disabled>
						Choose Workshop Date
					</option>
					<option value="june18">June 18th, 7PM</option>
					<option value="june24">June 24th, 7PM</option>
					<option value="july1">July 1st, 7PM</option>
				</select>
				<button type="submit" className="noir-btn">
					Register_
				</button>
			</form>
			<img
				src="/levratech_logo_vector.svg"
				alt="LevraTech Logo"
				className="hero-logo"
				style={{
					margin: '0, 0',
					maxWidth: '80px',
					opacity: 0.9,
				}}
			/>
		</div>
	)
}

export default App
