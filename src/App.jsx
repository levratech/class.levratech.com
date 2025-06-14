import './App.css'
import { useEffect, useState } from 'react'

function App() {
	const [formSubmitting, setFormSubmitting] = useState(false)

	useEffect(() => {
		const hashData = window.location.hash.substring(1)
		const existingTracking = JSON.parse(
			localStorage.getItem('levra_tracking') || '{}'
		)

		if (!existingTracking.timestamp) {
			const newTracking = {
				hash: hashData,
				timestamp: Date.now(),
			}
			localStorage.setItem('levra_tracking', JSON.stringify(newTracking))

			// Ping server with hash data
			fetch('https://api.www.levratech.com/log', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(newTracking),
			})
		}
	}, [])

	return (
		<div className="hero">
			<div className="ring-binder"></div>
			<div className="hero-body">
				<h1 className="headline noir-headline">
					Unlock AI For YOUR Business!!
				</h1>
				<p className="subtext noir-subtext">
					Reserve Your Seat In Our FREE Local Workshop.
					<br />
					Walk Away With Real Options Even If Tech Isn’t Your Thing.
				</p>
				<div className="supporting noir-supporting">
					Location: Savage Library
					<br />
					Room: Large Meeting Room.
					<br />
					<br />
					<span className="limited">
						Space Is Limited!
						<br />
						Pick Your Date And Claim Your Seat.
					</span>
				</div>
				<form
					className="signup-form noir-form"
					onSubmit={async (e) => {
						e.preventDefault()
						setFormSubmitting(true)

						const name = e.target.name.value
						const email = e.target.email.value
						const date = e.target.date.value
						const trackingData = JSON.parse(
							localStorage.getItem('levra_tracking') || '{}'
						)

						const payload = {
							name,
							email,
							date,
							...trackingData,
						}

						try {
							await fetch('https://api.www.levratech.com/log', {
								method: 'POST',
								headers: {
									'Content-Type': 'application/json',
								},
								body: JSON.stringify(payload),
							})
							// Optionally: redirect or show success state
						} catch (err) {
							console.error('Registration failed:', err)
						} finally {
							setFormSubmitting(false)
						}
					}}
				>
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
					<button type="submit" className="noir-btn" disabled={formSubmitting}>
						{formSubmitting ? 'Registering...' : 'Register_'}
					</button>
				</form>
				<br />
				<br />
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
		</div>
	)
}

export default App
