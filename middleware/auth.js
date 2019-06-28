export default function({ store, redirect }) {
	console.log('middleware')
	if (!store.state.user) {
		return redirect('/login')
	}
}
