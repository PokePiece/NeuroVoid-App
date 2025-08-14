import React from 'react'

const TailwindPaper = () => {

    const content = `
    `

    return (
        <div className='my-3'>
            Container<br /><br />
            A component for fixing an element's width to the current breakpoint.
<br /><br />
            Default class reference
            Class
            Breakpoint
            Properties
            container	None	width: 100%;
            sm (640px)	max-width: 640px;
            md (768px)	max-width: 768px;
            lg (1024px)	max-width: 1024px;
            xl (1280px)	max-width: 1280px;
            2xl (1536px)	max-width: 1536px;
            Usage
            The container class sets the max-width of an element to match the min-width of the current breakpoint. This is useful if you’d prefer to design for a fixed set of screen sizes instead of trying to accommodate a fully fluid viewport.
<br /><br />
            Note that unlike containers you might have used in other frameworks, Tailwind’s container does not center itself automatically and does not have any built-in horizontal padding.

            To center a container, use the mx-auto utility:
        
            If you’d like to center your containers by default or include default horizontal padding, see the customization options below.
<br /><br />
            Responsive variants
            The container class also includes responsive variants like md:container by default that allow you to make something behave like a container at only a certain breakpoint and up:

<br /><br />
         
            Customizing
            Centering by default
            To center containers by default, set the center option to true in the theme.container section of your config file:

            // tailwind.config.js
            module.exports = 
<br /><br />
            Horizontal padding
            To add horizontal padding by default, specify the amount of padding you’d like using the padding option in the theme.container section of your config file:
<br /><br />
            // tailwind.config.js
<br /><br />
            If you want to specify a different padding amount for each breakpoint, use an object to provide a default value and any breakpoint-specific overrides:
<br /><br />
            // tailwind.config.js
 <br /><br />
            Disabling responsive variants
            If you’d like to disable the responsive variants, you can do so using by setting container to an empty array in the variants section of your tailwind.config.js file:

            // tailwind.config.js
            module.exports = 
  
            Disabling entirely
            If you don’t plan to use the container class in your project, you can disable it entirely by setting the container property to false in the corePlugins section of your config file:

            // tailwind.config.js
            module.exports = 
     
        </div>
    )
}

export default TailwindPaper