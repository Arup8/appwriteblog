import React from 'react'

function Button({
    children,
    // those are the default props of this components, we will take all those properties and add them to our own custom component.
    type = 'button', // type of button, by default it will take value as 'button' but we can change this to any other types like submit or reset etc.
    bgColor = 'bg-blue-600',
    textColor = 'text-white',
    className = '',
    ...props // as we give the above are props but there are too many props we didn't know show we spread that all props which will come
}) {
  return (
    <button className={`px-4 py-2 rounded-lg ${className} ${bgColor} ${textColor}`} {...props}>
        {children} {/* This is the children prop // in that children anything you can pass also a text can be pass through the button component. */}
    </button>
  )
}

export default Button