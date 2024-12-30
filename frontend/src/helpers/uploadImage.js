const url = `https://api.cloudinary.com/v1_1/dlodesqyz/image/upload`;

const uploadImage = async (image) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "e_product");
  formData.append("cloud_name", "dlodesqyz");

  const dataResponse = await fetch(
    "https://api.cloudinary.com/v1_1/dlodesqyz/image/upload",
    {
      method: "post",
      body: formData,
    }
  );

  return dataResponse.json();
};

export default uploadImage;
