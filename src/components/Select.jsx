import React, {useId} from 'react'

function Select({
    options,
    label,
    className = '',
    ...props
}, ref) {
    const id = useId()
  return (
    <div className='w-full'>
        {label && <label htmlFor={id} className=''></label>}
        <select
        {...props}
        id={id}
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full 
             ${className}`}
        >
         {/* {options.map} */}
         {/* Dierctly don't add loop on options cause if it doesn't conatins any values then it will crash */}
         {/* Better to check that is that options contains any value or not */}
         {options?.map((option) => (
            <option key={option} value={option}>
                {option}
            </option>
         ))}
        </select>
    </div>
  )
}

// export default Select
export default React.forwardRef(Select)