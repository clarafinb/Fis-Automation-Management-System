import { useDispatch, useSelector } from "react-redux";


export function useRedux() {
	const dispatch = useDispatch()
	const store = useSelector(state => state)
	return {
		dispatch,
		...store
	}
}