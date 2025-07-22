import React from 'react'

const DeleteAlert = ({ content, onDelete, loading, setLoading }) => {
  return (
    <div>
        <p className='text-sm'>{content}</p>

        <div className='flex justify-end mt-5'>
            <button
             type='button'
             disabled={loading}
             className='add-btn add-btn-fill'
             onClick={()=> {
                        onDelete()
                        setLoading(true)
                    }
                  }
            >
                {loading? 'Deleting...' : 'Delete'}
            </button>
        </div>
    </div>
  )
}

export default DeleteAlert