import React, {useState} from "react";
import { Layout } from "antd";
import Sidebar from "../components/layout/Sidebar";
import ParkingLot from "../components/parking/ParkingLot";
import { processImageToLayout } from '../services/imageProcessing';
const { Content } = Layout;

const Dashboard = () => {
  const [parkingLayout, setParkingLayout] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [layoutName, setLayoutName] = useState('default');
  
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    // Show image preview
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target.result);
    reader.readAsDataURL(file);
    
    try {
      setIsProcessing(true);
      
      // Extract filename to show the user which layout will be used
      const filename = file.name.toLowerCase();
      if (filename.includes('map1')) {
        setLayoutName('map1');
      } else if (filename.includes('map2')) {
        setLayoutName('map2');
      } else if (filename.includes('map3')) {
        setLayoutName('map3');
      } else {
        setLayoutName('default');
      }
      
      const layout = await processImageToLayout(file);
      setParkingLayout(layout);
    } catch (error) {
      alert('Failed to process image: ' + error.message);
    } finally {
      setIsProcessing(false);
    }
  };
  
  // Function to manually select a layout
  const selectLayout = async (layoutName) => {
    try {
      setIsProcessing(true);
      setLayoutName(layoutName);
      
      // Create a mock file to pass to processImageToLayout
      const mockFile = new File([""], `${layoutName}.jpg`, {
        type: "image/jpeg",
      });
      
      const layout = await processImageToLayout(mockFile);
      setParkingLayout(layout);
    } catch (error) {
      alert('Failed to load layout: ' + error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh", display: "flex" }}>
      <Sidebar />
      <Layout style={{ padding: 20 }}>
      <div className="container mx-auto p-4">
      
      {!parkingLayout ? (
        <div className="text-center p-8 bg-gray-100 rounded">
          <h2 className="text-xl font-semibold mb-4">Upload Parking Lot Image</h2>
          <p className="mb-4">Upload an image of a parking lot to start. The system will analyze the filename and create an interactive layout.</p>
          
          <div className="mb-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mb-4"
              disabled={isProcessing}
            />
            
            <p className="text-sm text-gray-600 mb-4">
              Tip: Name your file with 'map1', 'map2', or 'map3' to load different layouts.
            </p>
          </div>
          
          {isProcessing && (
            <div className="text-center p-4">
              <p>Processing image... Please wait.</p>
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mt-4"></div>
            </div>
          )}
          
          {imagePreview && (
            <div className="mt-4">
              <h3 className="text-lg font-medium mb-2">Image Preview (Will use {layoutName} layout)</h3>
              <img src={imagePreview} alt="Parking lot" className="max-w-lg mx-auto border" />
            </div>
          )}
          
          <div className="mt-6 grid grid-cols-2 gap-4">
            <button
              className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => selectLayout('default')}
              disabled={isProcessing}
            >
              Use Default Layout
            </button>
            <button
              className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              onClick={() => selectLayout('map1')}
              disabled={isProcessing}
            >
              Use Map 1 Layout
            </button>
            <button
              className="px-6 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              onClick={() => selectLayout('map2')}
              disabled={isProcessing}
            >
              Use Map 2 Layout
            </button>
            <button
              className="px-6 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
              onClick={() => selectLayout('map3')}
              disabled={isProcessing}
            >
              Use Map 3 Layout
            </button>
          </div>
        </div>
      ) : (
        <ParkingLot
          initialLayout={parkingLayout}
          onLayoutChange={(layout) => console.log('Layout updated:', layout)}
          parkingLotId="floor1"
        />
      )}
      
      <div className="mt-8 p-4 bg-gray-100 rounded">
        <h3 className="text-lg font-bold mb-2">System Overview</h3>
        <p className="mb-2">This application provides a complete parking lot management solution:</p>
        <ol className="list-decimal pl-6">
          <li>Upload a parking lot image to generate an interactive layout (using filename to determine layout)</li>
          <li>Add cars to specific parking spots with details (model, color, license plate)</li>
          <li>Remove cars when they leave</li>
          <li>All changes are synchronized with the database</li>
        </ol>
      </div>
    </div>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
