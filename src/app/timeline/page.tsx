import AddPost from "@/components/add-post";

export default function Page() {
  return (
    <div className="mt-4 grid grid-cols-3">
      <div></div>
      <div>
        <AddPost />
      </div>
      <div></div>
    </div>
  );
}
