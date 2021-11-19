import { useState, useEffect } from 'react';
import NotesList from './components/NotesList';
import Search from './components/Search';


const App = () => {
	const [notes, setNotes] = useState([
		{
			id:1,
			text: ' first note',
			date: '15/11/2021',
		},
		{
			id:2,
			text: 'second note',
			date: '16/11/2021',
		},
		{
			id: 3,
			text: 'third note',
			date: '17/11/2021',
		},
		{
			id: 4,
			text: 'new note',
			date: '18/11/2021',
		},
	]);

	const [searchText, setSearchText] = useState('');


	useEffect(() => {
		const savedNotes = JSON.parse(
			localStorage.getItem('react-notes-app-data')
		);

		if (savedNotes) {
			setNotes(savedNotes);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem(
			'react-notes-app-data',
			JSON.stringify(notes)
		);
	}, [notes]);

	const addNote = (text) => {
		const date = new Date();
		const newNote = {
			id:'',
			text: text,
			date: date.toLocaleDateString(),
		};
		
		const newNotes = [...notes, newNote];
		setNotes(newNotes);
	};

	const deleteNote = (id) => {
		const newNotes = notes.filter((note) => note.id !== id);
		setNotes(newNotes);
	};

	return (
		
			<div className='container'>
				<h1>Simple Note App</h1>
				
				<Search handleSearchNote={setSearchText} />
				<NotesList notes={notes.filter((note) =>note.text.toLowerCase().includes(searchText))}
				    handleAddNote={addNote}
					handleDeleteNote={deleteNote}
				/>
			</div>
		
	);
};

export default App;
