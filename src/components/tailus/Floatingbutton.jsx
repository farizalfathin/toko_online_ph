import { Link } from "react-router-dom";

export default function FloatingButton() {
  return (
    <div className="fixed bottom-6 right-6 rounded-full shadow-md">
      <Link to="https://wa.me/+62812xxxxxxxx?text=" target="_blank">
        <img
          className="size-12"
          src="https://static.vecteezy.com/system/resources/thumbnails/016/716/468/small/whatsapp-icon-free-png.png"
          alt=""
        />
      </Link>
    </div>
  );
}
