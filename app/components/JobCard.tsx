'use client';

import { useRouter } from 'next/navigation';

const JobCard = ({job}: {job: {_id: string; title: string; company: string; remote: boolean; location: string; }}) => {
    const router = useRouter();

    const handleViewDetails = (jobId: string) => {
        router.push(`/browse-jobs/${jobId}`);
    }

    return (
        <div
            key={job._id}
            onClick={() => handleViewDetails(job._id)}
            className="card bg-[#16181d] text-neutral-content border border-neutral/20 shadow-xl p-5 rounded-xl hover:border-neutral-content/30 transition-all"
        >
            <h2 className="text-lg font-semibold text-white tracking-wide">{job.title}</h2>
        </div>
    );
};

export default JobCard;