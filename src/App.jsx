import './App.css'
import { useEffect, useState } from 'react'

function App() {
	const [formSubmitting, setFormSubmitting] = useState(false)
	const [registrationData, setRegistrationData] = useState(null)

	useEffect(() => {
		const hashData = window.location.hash.substring(1)
		let tracking = JSON.parse(localStorage.getItem('levra_tracking') || '{}')

		// Check for registration data in localStorage
		const reg = JSON.parse(localStorage.getItem('levra_tracking') || '{}')
		if (reg.name && reg.email && reg.date) {
			setRegistrationData(reg)
		}

		if (!tracking.timestamp) {
			tracking = {
				hash: hashData,
				timestamp: Date.now(),
			}
			localStorage.setItem('levra_tracking', JSON.stringify(tracking))
		}

		// Always ping server with current tracking data
		fetch('https://api.www.levratech.com/log', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(tracking),
		})
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
				{registrationData ? (
					<div className="thank-you-message">
						<h2>Thank you, {registrationData.name}!</h2>
						<p>
							You're registered for the{' '}
							<strong>
								{registrationData.date === 'june18'
									? 'June 18th, 7PM'
									: registrationData.date === 'june24'
									? 'June 24th, 7PM'
									: registrationData.date === 'july1'
									? 'July 1st, 7PM'
									: registrationData.date}
							</strong>{' '}
							class.
						</p>
						<p>
							The workshop will be held at:
							<br />
							<a
								href="https://www.google.com/maps?q=13090+Alabama+Ave,+Savage,+MN+55378"
								target="_blank"
								rel="noopener noreferrer"
							>
								13090 Alabama Ave, Savage, MN 55378
							</a>
						</p>
					</div>
				) : (
					<form
						className="signup-form noir-form"
						onSubmit={async (e) => {
							e.preventDefault()
							setFormSubmitting(true)

							const name = e.target.name.value
							const email = e.target.email.value
							const date = e.target.date.value

							const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
							if (!emailRegex.test(email)) {
								alert('Please enter a valid email address.')
								setFormSubmitting(false)
								return
							}

							let trackingData = JSON.parse(
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
								// Save registration info into tracking
								localStorage.setItem(
									'levra_tracking',
									JSON.stringify({ ...trackingData, name, email, date })
								)
								setRegistrationData({ name, email, date })
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
						<button
							type="submit"
							className="noir-btn"
							disabled={formSubmitting}
						>
							{formSubmitting ? 'Registering...' : 'Register_'}
						</button>
					</form>
				)}
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
