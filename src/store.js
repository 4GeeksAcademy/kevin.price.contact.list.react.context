export const initialStore = () => ({
  contacts: [],
});

export default function storeReducer(store, action) {
  switch (action.type) {
    case "SET_CONTACTS":
      return { ...store, contacts: action.payload };
    default:
      return store;
  }
}