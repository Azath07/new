// App.tsx
import React, { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Button, CssBaseline, Typography } from "@mui/material";
import CrudTable from "./components/Table";
import CreateForm from "./components/CreateForm";
import EditForm from "./components/EditForm";
import ViewForm from "./components/ViewForm";
import "./App.css";
//import Header from "./components/Header";
import Navbar from "./components/Nav";

export interface UserData {
  id: number;
  name: string;
  email: string;
  username: string;
  phone: string;
  website: string;
}

const App = () => {
  const [data, setData] = useState<UserData[]>([]);
  const [selectedItem, setSelectedItem] = useState<UserData | null>(null);
  const [isCreateFormOpen, setCreateFormOpen] = useState(false);
  const [isEditFormOpen, setEditFormOpen] = useState(false);
  const [isViewFormOpen, setViewFormOpen] = useState(false);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data: UserData[]) => setData(data));
  }, []);

  const handleDelete = (id: number) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
    console.log("Delete item with id:", id);
  };

  const handleEdit = (item: UserData) => {
    setSelectedItem(item);
    setEditFormOpen(true);
  };

  const handleView = (item: UserData) => {
    setSelectedItem(item);
    setViewFormOpen(true);
  };

  const handleCreate = () => {
    setCreateFormOpen(true);
  };

  const handleCreateFormSubmit = (newItem: UserData) => {
    setData((prevData) => [...prevData, newItem]);
    setCreateFormOpen(false);
  };

  const handleEditFormSubmit = (updatedItem: UserData) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === updatedItem.id ? { ...item, ...updatedItem } : item
      )
    );
    setEditFormOpen(false);
  };

  return (
    <QueryClientProvider client={new QueryClient()}>
      <Router>
        <Navbar />
        <CssBaseline />

        <div className="content-container">
          <div>
            <div>
              <Typography variant="h4" component="h2" gutterBottom>
                Table Title
              </Typography>

              <Button
                className="button-container"
                variant="contained"
                onClick={handleCreate}
              >
                Create
              </Button>

              <Routes>
                <Route
                  path="/"
                  element={
                    <CrudTable
                      data={data}
                      onDelete={handleDelete}
                      onEdit={handleEdit}
                      onView={handleView}
                    />
                  }
                />
                <Route
                  path="/view/:id"
                  element={
                    <ViewForm
                      data={selectedItem!}
                      onClose={() => setViewFormOpen(false)}
                    />
                  }
                />
                <Route
                  path="/edit/:id"
                  element={
                    <EditForm
                      data={selectedItem!}
                      onSubmit={handleEditFormSubmit}
                      onClose={() => setEditFormOpen(false)}
                    />
                  }
                />
              </Routes>
              {isCreateFormOpen && (
                <CreateForm
                  open={isCreateFormOpen}
                  onClose={() => setCreateFormOpen(false)}
                  onSubmit={handleCreateFormSubmit}
                />
              )}
              {isEditFormOpen && (
                <Navigate to={`/edit/${selectedItem?.id}`} replace />
              )}
              {isViewFormOpen && (
                <Navigate to={`/view/${selectedItem?.id}`} replace />
              )}
            </div>
          </div>
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
