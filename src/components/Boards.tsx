import { useBoards } from '@/hooks/useBoards';

export const Boards = () => {
	const { data, error, isLoading } = useBoards();

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error loading boards: {error.message}</div>;

  return (
	<div>
		<h1>Boards</h1>
		<ul>
			{data?.map((board: any) => (
				<li key={board.id}>
					<h2>{board.title}</h2>
					<p>{board.description}</p>
					<span style={{ backgroundColor: board.color }}>{board.color}</span>
				</li>
			))}
		</ul>
	</div>
  )
}
