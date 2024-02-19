import React, { useState } from 'react';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare ,faCheckSquare} from '@fortawesome/free-solid-svg-icons';

function App() {
    const [formData, setFormData] = useState({
        studentNo: '',
        firstName: '',
        lastName: '',
        age: '',
        phoneNo: ''
    });
    const [selectedRowIndex, setSelectedRowIndex] = useState(null); 
    const [rows, setRows] = useState([
        {
            studentNo: '1',
            firstName: 'John',
            lastName: 'Doe',
            age: '30',
            phoneNo: '123-456-7890'
        },
        {
            studentNo: '2',
            firstName: 'Jane',
            lastName: 'Doe',
            age: '25',
            phoneNo: '987-654-3210'
        },
        {
            studentNo: '3',
            firstName: 'Tom',
            lastName: 'Smith',
            age: '40',
            phoneNo: '111-222-3333'
        },
        {
            studentNo: '4',
            firstName: 'Jerry',
            lastName: 'Smith',
            age: '35',
            phoneNo: '444-555-6666'
        },
        {
            studentNo: '5',
            firstName: 'Marry',
            lastName: 'Smith',
            age: '28',
            phoneNo: '777-888-9999'
        },
        {
            studentNo: '6',
            firstName: 'Mike',
            lastName: 'Smith',
            age: '32',
            phoneNo: '000-111-2222'
        },
        {

            studentNo: '7',
            firstName: 'Marry',
            lastName: 'Smith',
            age: '28',
            phoneNo: '777-888-9999'
        },
        {
            studentNo: '8',
            firstName: 'Mike',
            lastName: 'Smith',
            age: '32',
            phoneNo: '000-111-2222'
        },
        {

            studentNo: '9',
            firstName: 'Marry',
            lastName: 'Smith',
            age: '28',
            phoneNo: '777-888-9999'
        },
        {
            studentNo: '10',
            firstName: 'Mike',
            lastName: 'Smith',
            age: '32',
            phoneNo: '000-111-2222'
        }
        
    ]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAdd = () => {
        if (formData.age === '' || formData.firstName === '' || formData.lastName === '' || formData.phoneNo === '' || formData.studentNo === '') {
            window.alert('Please fill in all fields');
        } else {
            setRows(prevRows => [...prevRows, formData]);
            setFormData({
                studentNo: '',
                firstName: '',
                lastName: '',
                age: '',
                phoneNo: ''
            });
        }
    };

    const handleDelete = (index) => {
        setRows(prevRows => prevRows.filter((row, i) => i !== index));
    };

    const handleEdit = (index) => {
        setSelectedRowIndex(index); 
        const selectedRow = rows[index];
        setFormData({
            studentNo: selectedRow.studentNo,
            firstName: selectedRow.firstName,
            lastName: selectedRow.lastName,
            age: selectedRow.age,
            phoneNo: selectedRow.phoneNo
        });
    };

    const handleSaveEdit = () => {
        if (selectedRowIndex !== null) {
          
            setRows(prevRows => {
                const updatedRows = [...prevRows];
                updatedRows[selectedRowIndex] = { ...formData };
                return updatedRows;
            });
           
            setFormData({
                studentNo: '',
                firstName: '',
                lastName: '',
                age: '',
                phoneNo: ''
            });
            setSelectedRowIndex(null);
        }
    };

    return (
        <div className="border border-red-700 mx-auto flex justify-center h-screen items-start">
            <table className="table-auto">
                <thead>
                    <tr>
                        <th className="px-8 py-5 w-auto"><input className='h-10 text-center border rounded w-auto ' type="number" placeholder="Student no" name="studentNo" value={formData.studentNo} onChange={handleChange} required /></th>
                        <th className="px-8 py-5 w-auto"><input className='h-10 text-center border rounded w-auto' type="text" placeholder="First Name" name="firstName" value={formData.firstName} onChange={handleChange} required /></th>
                        <th className="px-8 py-5 w-auto"><input className='h-10 text-center border rounded w-auto' type="text" placeholder="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} required /></th>
                        <th className="px-8 py-5 w-auto"><input className='h-10 text-center border rounded w-auto' type="number" placeholder="Age" name="age" value={formData.age} onChange={handleChange} required /></th>
                        <th className="px-8 py-5 w-auto"><input className='h-10 text-center border rounded w-auto' type="text" placeholder="Phone no" name="phoneNo" value={formData.phoneNo} onChange={handleChange} required /></th>
                        <th className="px-8 py-5 w-auto">
                        {selectedRowIndex !== null  ?(<>
                        </>) :
                         (<>
                         <div className='bg-mycolor h-10 w-10 rounded-full flex items-center justify-center font-semibold text-white hover:bg-white text-xl hover:text-mycolor hover:border-2 hover:border-mycolor hover:cursor-pointer' onClick={handleAdd}>
                                <p><FontAwesomeIcon icon={faPlus} /></p>
                            </div>
                        </>)}
                            
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {rows.map((row, index) => (
                        <tr key={index}>
                            <td className="border px-4 py-2 w-auto">{row.studentNo}</td>
                            <td className="border px-4 py-2 w-auto">{row.firstName}</td>
                            <td className="border px-4 py-2 w-auto">{row.lastName}</td>
                            <td className="border px-4 py-2 w-auto">{row.age}</td>
                            <td className="border px-4 py-2 w-auto">{row.phoneNo}</td>
                            <td className='flex'>
                                {selectedRowIndex === index ? ( 
                                    <>
                                        <div className='bg-mycolor h-8 w-8 rounded-full flex items-center justify-center font-semibold text-white ml-2 hover:bg-white hover:text-mycolor hover:border-2 hover:border-mycolor hover:cursor-pointer' onClick={handleSaveEdit}>
                                            <p><FontAwesomeIcon icon={faCheckSquare} /></p>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className='bg-mycolor h-8 w-8 rounded-full flex items-center justify-center font-semibold text-white ml-2 hover:bg-white hover:text-mycolor hover:border-2 hover:border-mycolor hover:cursor-pointer' onClick={() => handleDelete(index)}>
                                            <p><FontAwesomeIcon icon={faTrash} /></p>
                                        </div>
                                        <div className='bg-mycolor h-8 w-8 rounded-full flex items-center justify-center font-semibold text-white ml-2 hover:bg-white hover:text-mycolor hover:border-2 hover:border-mycolor hover:cursor-pointer' onClick={() => handleEdit(index)}>
                                            <p><FontAwesomeIcon icon={faPenToSquare} /></p>
                                        </div>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;

