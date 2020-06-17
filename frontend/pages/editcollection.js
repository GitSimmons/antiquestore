import { UpdateCollection } from "../components/UpdateCollection";

const editCollectionPage = ({ query: { collection } }) => (
  <UpdateCollection collection={collection} />
);
export default editCollectionPage;
