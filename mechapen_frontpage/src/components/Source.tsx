

const Source = () => {
    return (
        <section className="py-16 px-6 bg-gray-700">
            <h2 className="text-3xl font-semibold text-center mb-10">View Source</h2>
            <div className="max-w-3xl mx-auto list-disc list-inside space-y-3 text-gray-300">

                <p className="text-lg text-underline">
                    <a href="https://github.com/PokePiece/mechatronic_pen_ros_wsl" 
                        className='text-blue-300'
                    target="_blank" rel="noopener noreferrer">
                        GitHub Repository
                    </a> 
                    {' '}
                    - Access the project's source code and contribute to its development.
                    {' '} <br /><br />
                    <a href="https://github.com/PokePiece/mechatronic_pen_ros_wsl/issues" 
                    className='text-blue-300'
                    target="_blank" rel="noopener noreferrer">
                        Report an Issue
                    </a>
                    {' '}
                    - If you encounter any bugs or have feature requests.
                    {' '} <br /><br />
                    <a href="https://github.com/PokePiece/mechatronic_pen_ros_wsl/blob/main/CONTRIBUTING.MD" 
                        className='text-blue-300'
                    target="_blank" rel="noopener noreferrer">
                        Contributing Guide
                    </a>
                     {' '}
                    - Contributions are welcome!
                    {' '}
                </p>

            </div>
        </section>
    )
}

export default Source