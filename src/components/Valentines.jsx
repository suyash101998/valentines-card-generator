import { useRef, useState } from "react";
import { saveAs } from "file-saver";
import {  HiHeart } from "react-icons/hi";
import { FaDownload, FaImage,  } from "react-icons/fa";
import { BsFillSuitHeartFill } from "react-icons/bs";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import html2canvas from "html2canvas";
function Valentines() {
  const [person1Name, setPerson1Name] = useState("");
  const [person2Name, setPerson2Name] = useState("");
  const [person1Image, setPerson1Image] = useState("");
  const [person2Image, setPerson2Image] = useState("");
  const [imagePreview1, setImagePreview1] = useState("");
  const [imagePreview2, setImagePreview2] = useState("");
  const card = useRef();
  const [showGenerate1, setShowGenerate1] = useState(false);
  const [showGenerate2, setShowGenerate2] = useState(false);
  function handlePerson1ImageChange(event) {
    const file = event.target.files[0];
    setPerson1Image(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview1(e.target.result);
    };
    reader.readAsDataURL(file);
    setShowGenerate1(true)
  }

  function handlePerson2ImageChange(event) {
    const file = event.target.files[0];
    setPerson2Image(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview2(e.target.result);
    };
    reader.readAsDataURL(file);
    setShowGenerate2(true)
  }

  function handleDownload() {

    const cardElement = card.current;
    html2canvas(cardElement, { useCORS: true }).then((canvas) => {
      const imageUrl = canvas.toDataURL("image/png");
      const blobUrl = URL.createObjectURL(dataURItoBlob(imageUrl));
      saveAs(blobUrl, "valentine-card.png");
    });
  }

  function dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }
  const [isHidden, setIsHidden] = useState(true);

  const handleClick = () => {
    setIsHidden(!isHidden);
  };


  return (
    <div className="h-screen bg-gray-100">
      <div className="flex justify-center items-center pt-12">
        <div className="bg-white rounded-xl shadow-xl p-10 flex flex-col items-center gap-4 m-8">
          <h1 className="text-6xl font-header font-bold text-center flex mb-4">
            Genrate Your Own Card{" "}
            <span className="text-4xl text-red-600 pl-2">
              <HiHeart />
            </span>
          </h1>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-shrink-0">
              <label
                htmlFor="person1Image"
                className="cursor-pointer rounded-lg border-2 border-dashed border-pink-500 p-4 hover:bg-pink-50 hover:shadow-md inline-block top-0 right-0"
              >
                <div className="w-20 h-20 bg-pink-100 rounded-lg flex justify-center items-center">
                  <FaImage className="text-red-500 text-4xl" />
                </div>
                <div className="text-center mt-2">
                  {person1Image ? (
                    <span className="font-medium text-red-500">
                      {person1Image.name.slice(0,10)}
                    </span>
                  ) : (
                    <span className="text-gray-400">Choose Image</span>
                  )}
                </div>
                <input
                  type="file"
                  id="person1Image"
                  name="person1Image"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePerson1ImageChange}
                />
              </label>
              {imagePreview1 && (
                <img
                  src={imagePreview1}
                  alt="Person 1"
                  className="w-16 h-16 rounded-full absolute top-0 right-0 transform translate-x-1/2 translate-y-1/2"
                />
              )}
            </div>
            <div className="relative flex-shrink-0">
              <label
                htmlFor="person2Image"
                className="cursor-pointer rounded-lg border-2 border-dashed border-pink-500 p-4 hover:bg-pink-50 hover:shadow-md inline-block top-0 right-0 "
              >
                <div className="w-20 h-20 bg-pink-100 rounded-lg flex justify-center items-center ">
                  <FaImage className="text-red-500 text-4xl" />
                </div>
                <div className="text-center mt-2">
                  {person2Image ? (
                    <span className="font-small text-red-500">
                      {person2Image.name.slice(0,10)}
                    </span>
                  ) : (
                    <span className="text-gray-400">Choose Image</span>
                  )}
                </div>
                <input
                  type="file"
                  id="person2Image"
                  name="person2Image"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePerson2ImageChange}
                />
              </label>
              {imagePreview2 && (
                <img
                  src={imagePreview2}
                  alt="Person 2"
                  className="w-16 h-16 rounded-full absolute top-0 right-0 transform translate-x-1/2 translate-y-1/2"
                />
              )}
            </div>

            <div className="block">
              <div className="flex flex-col gap-2 w-full mt-4">
                <input
                  type="text"
                  id="person1Name"
                  name="person1Name"
                  placeholder="Person 1"
                  className="border border-gray-300 p-2 rounded-lg"
                  value={person1Name}
                  maxLength = {10}
                  onChange={(event) => setPerson1Name(event.target.value)}
                />
                <input
                  type="text"
                  id="person2Name"
                  name="person2Name"
                  placeholder="Person 2"
                  className="border border-gray-300 p-2 rounded-lg"
                  value={person2Name}
                  maxLength = {10}
                  onChange={(event) => setPerson2Name(event.target.value)}
                />
              </div>
              <button
                className={showGenerate1 && showGenerate2 ? ("bg-pink-600 text-white rounded-lg px-6 py-2 hover:bg-pink-700 hover:shadow-md mt-6") : ("bg-grey-300 text-white rounded-lg px-6 py-2")}
                onClick={() => { handleClick(); }}
              >
                Generate{" "}
                <IoIosArrowDroprightCircle className="inline-block ml-2" />
              </button>
            </div>

            <div className={isHidden ? "hidden" : "block" } >
              <div ref={card} className="w-80 h-[32rem] bg-white rounded-lg shadow-lg relative overflow-hidden bg-card bg-no-repeat bg-cover ">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center ">
                  <h2 className="text-5xl font-content text-white pb-5"> Happy Valentines day </h2>
                  <div className=" flex flex-col">
                    <div className="flex gap-2">
                      <img
                        src={imagePreview1}
                        alt="Person 1"
                        className=" size-24 rounded-full "
                        style={{ objectFit: "cover"}}
                      />
                      <img
                        src={imagePreview2}
                        alt="Person 2"
                        className=" size-24 rounded-full "
                        style={{ objectFit: "cover"}}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <h2 className=" font-content text-4xl text-white">
                        {person1Name}
                      </h2>
                      <h2 className=" text-4xl font-content text-white display:inline-flex  " >&</h2>
                      <h2 className="text-4xl font-content text-white">
                        {person2Name}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="bg-pink-600 text-white rounded-lg px-6 py-2 hover:bg-pink-700 hover:shadow-md mt-6"
                onClick={() => { handleDownload(); }}
              >
                Download{" "}
                <FaDownload className="inline-block ml-2" />
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

export default Valentines;