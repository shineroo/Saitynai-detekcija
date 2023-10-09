import React from 'react';


interface CreateCategoryButtonProps {
  onCreateCategory: (response: { status: number; data: any }) => void;
}

function CreateCategoryButton({ onCreateCategory }: CreateCategoryButtonProps) {
  const handleClick = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: 'NewCategoryName' }), // You can replace with user input
      });

      if (!response.ok) {
        onCreateCategory({ status: response.status, data: null });
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      onCreateCategory({ status: response.status, data: result });
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  return (
    <button onClick={handleClick}>Create a new category</button>
  );
}

export default CreateCategoryButton;