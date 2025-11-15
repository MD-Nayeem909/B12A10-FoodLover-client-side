import React from 'react';
import ReviewCard from './ReviewCard';
import { Link } from 'react-router';
import useService from '../Hooks/useService';
import Loading from '../Utility/Loading';
import { useAuth } from '../Providers/AuthContext';

const RecentReviews = () => {
	const { user } = useAuth();
	const { data, loading } = useService('http://localhost:3000/api/reviews');

	const reviews =
		(data.data &&
			data.data
				.filter((r) => r.rating == 5)
				.slice(0, 6)
				.sort(() => Math.random() - 0.5)) ||
		[];

	return (
		<div className="my-20">
			<div className="">
				<h2 className="text-4xl font-bold mb-2">
					Featured Reviews:
					<span className="text-gradient"> {reviews.length}</span>
				</h2>
				<p className="text-accent animate-bounce">Top-rated food experiences from our community</p>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-8 my-10">
				{!loading ? (
					reviews.map((review) => {
						const isFavorite = user && user.favorites.includes(review._id);
						return <ReviewCard key={review._id} review={review} isFavorite={isFavorite} />;
					})
				) : (
					<div className="mx-auto col-span-12">
						<Loading />
					</div>
				)}
			</div>
			<Link to="/all-reviews" className="btn btn-primary flex mx-auto w-fit">
				Show All Reviews
			</Link>
		</div>
	);
};

export default RecentReviews;
