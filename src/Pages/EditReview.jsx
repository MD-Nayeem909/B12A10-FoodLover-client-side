import React, { useState } from 'react';
import Container from '../Utility/Container';
import { Link, useLocation, useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import api from '../Utility/axios';

const EditReview = () => {
	const location = useLocation();

	const from = location.state?.from?.pathname || '/my-reviews';
	const reviewData = location.state?.reviewData || location.state;

	const [formData, setFormData] = useState({
		location: reviewData.location || '',
		rating: reviewData.rating || 5,
		reviewText: reviewData.reviewText || '',
		image: reviewData.image || '',
		tags: reviewData.tags.join(',') || '',
		foodName: reviewData.foodName || '',
		restaurantName: reviewData.restaurantName || '',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		api({
			method: 'put',
			url: 'http://localhost:3000/api/reviews/' + reviewData._id,
			data: formData,
		})
			.then((response) => {
				setFormData({
					foodName: '',
					image: '',
					restaurantName: '',
					location: '',
					rating: 5,
					reviewText: '',
					tags: [],
				});
			})
			.catch((error) => console.error(error));
	};

	return (
		<Container>
			<div className="my-20">
				<div className="max-w-3xl mx-auto">
					<Link to={from} state={{ from: location, review: reviewData }} className="font-medium text-xl flex items-center gap-2 mb-4">
						<ArrowLeft /> Back to My Reviews
					</Link>
					<h2 className="text-5xl font-bold mb-4">Edit Review</h2>
					<p className="text-accent mb-8">Update your food review</p>
				</div>
				<form onSubmit={handleSubmit} className="max-w-3xl mx-auto mt-10 bg-base-100 gap-7 p-8 rounded-lg shadow-xl flex flex-col">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<label className="label mb-2">
								<span className="label-text">Food Name</span>
							</label>
							<input
								name="foodName"
								onChange={handleChange}
								value={formData.foodName}
								type="text"
								placeholder="Product Name"
								className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border-gray-300 "
							/>
						</div>
						<div className="flex flex-col">
							<label className="label mb-2">
								<span className="label-text">Restaurant Name</span>
							</label>
							<input
								name="restaurantName"
								onChange={handleChange}
								value={formData.restaurantName}
								type="text"
								placeholder="Product Name"
								className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border-gray-300 "
							/>
						</div>
					</div>
					<div className="grid grid-cols-1">
						<div>
							<label className="label mb-2">
								<span className="label-text">Location of Restaurant</span>
							</label>
							<input
								name="location"
								onChange={handleChange}
								value={formData.location}
								type="text"
								placeholder="e.g. 18.5"
								className="input w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border-gray-300 "
							/>
						</div>
					</div>
					<div className="grid grid-cols-1">
						<label className="label mb-2">
							<span className="label-text">Food Image URL</span>
						</label>
						<input
							name="image"
							onChange={handleChange}
							value={formData.image}
							type="text"
							placeholder="https://...Image URL"
							className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border-gray-300 "
						/>
					</div>
					<div className="grid grid-cols-1">
						<label className="label mb-2">
							<span className="label-text">Rating</span>
						</label>
						<select
							id="rating"
							name="rating"
							value={formData.rating}
							onChange={handleChange}
							className="select select-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border-gray-300 "
						>
							<option value={5}>5 Stars - Excellent</option>
							<option value={4.5}>4.5 Stars</option>
							<option value={4}>4 Stars - Very Good</option>
							<option value={3.5}>3.5 Stars</option>
							<option value={3}>3 Stars - Good</option>
							<option value={2.5}>2.5 Stars</option>
							<option value={2}>2 Stars - Fair</option>
							<option value={1.5}>1.5 Stars</option>
							<option value={1}>1 Star - Poor</option>
						</select>
					</div>

					<div className="grid grid-cols-1">
						<label className="label mb-2">
							<span className="label-text">Your Review</span>
						</label>
						<textarea
							name="reviewText"
							onChange={handleChange}
							value={formData.reviewText}
							rows={6}
							className="textarea textarea-bordered w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border-gray-300 "
							placeholder="e.g. I bought this product 3 month ago. did not used more than 1/2 time. actually learning guitar is so tough..... "
						></textarea>
					</div>
					<div className="grid grid-cols-1">
						<label className="label mb-2">
							<span className="label-text">Tags (comma-separated)</span>
						</label>
						<input
							name="tags"
							onChange={handleChange}
							value={formData.tags}
							type="text"
							placeholder="e.g. spicy, vegan, dessert"
							className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border-gray-300 "
						/>
					</div>
					<div className="flex gap-4 w-full justify-end mt-6">
						<button className="btn btn-primary flex-1">Save Changes</button>
						<Link to={from} state={{ from: location, review: reviewData }} className="btn btn-outline border-gray-300 flex-1">
							Cancel
						</Link>
					</div>
				</form>
			</div>
		</Container>
	);
};

export default EditReview;
