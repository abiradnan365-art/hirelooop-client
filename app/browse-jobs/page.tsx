import { getJobs } from '@/lib/api/jobs';
import { FilterSidebar, SearchBar, SortSelect } from './filters';
import { redirect } from 'next/navigation';
import JobCard from '../components/JobCard';

const BrowseJobsPage = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {

    const search = await searchParams;
    const urlSearch = new URLSearchParams(search as Record<string, string>);
    const query = urlSearch.toString();

    console.log('searchParams:', query);
    const jobs = await getJobs(query);
    

    return (
        <div className="dark min-h-svh bg-[#04050a] text-foreground">
            <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
                <h1 className="text-2xl font-semibold tracking-tight">Browse Jobs</h1>

                <SearchBar defaultValue={search.q as string} />
                <div className="mt-6 grid gap-6 lg:grid-cols-[240px_1fr]">
                    <FilterSidebar />

                    <main>
                        {/* Results heading + sort, per the Figma listing header */}
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <h2 className="text-sm font-medium">
                                Found {jobs.length} Professional Jobs
                            </h2>
                            <SortSelect />
                        </div>

                        <div className="mt-4 space-y-4">
                            {jobs.map((job) => <JobCard key={job._id} job={job} />)}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default BrowseJobsPage;
