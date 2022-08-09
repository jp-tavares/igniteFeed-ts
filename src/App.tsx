import { Header } from './components/Header'
import { Post } from './components/Post'

import styles from './App.module.css'

import './global.css'
import { Sidebar } from './components/Sidebar'

//author: { avatar_url="", name="", role=""}
//publishedAt: Date
//content: string

interface Author {
	avatarUrl: string;
	name: string;
	role: string;
}

interface Content {
	type: 'paragraph' | 'link';
	content: string;
}

interface Post {
	id: number;
	author: Author;
	content: Content[];
	hashtags: string[];
	publishedAt: Date;
}

const posts:Post[] = [
	{
		id: 1,
		author: {
			avatarUrl: 'https://github.com/jp-tavares.png',
			name: 'João Tavares',
			role: 'Web Developer'
		},
 		content: [
			{ type: 'paragraph', content: 'Fala galeraa 👋' },
      { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'},
			{ type: 'link', content: 'jane.design/doctorcare'},
		],
		hashtags :[
			'#novoprojeto',
			'#nlw',
			'#rocketseat',
		],
		publishedAt: new Date('2022-08-04 10:56:12')
	},
	{
		id: 2,
		author: {
			avatarUrl: 'https://github.com/maykbrito.png',
			name: 'Mayk Brito',
			role: 'Educator'
		},
 		content: [
			{ type: 'paragraph', content: 'Fala pessoal 👋' },
      { type: 'paragraph', content: 'Finalmente finalizei meu novo site/portfólio. Foi um baita desafio criar todo o design e codar na unha, mas consegui 💪🏻 Acesse e deixe seu feedback 👉'},
			{ type: 'link', content: 'devonlane.design'},
		],
		hashtags :[
			'#uiux',
			'#userexperience',
		],
		publishedAt: new Date('2022-08-01 15:06:00')
	}
]

export function App() {
	return (
		<div>
			<Header />

			<div className={styles.wrapper}>
				<Sidebar />
				<main>
					{posts.map(post => {
						return (
							<Post 
								author={post.author}
								content={post.content}
								hashtags={post.hashtags}
								publishedAt={post.publishedAt}
								key={post.id} 
							/>
						)
					})}
				</main>
			</div>
		</div>
	)
}
