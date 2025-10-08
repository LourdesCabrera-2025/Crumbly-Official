function HomePage() {
    return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 text-gray-800 px-4">
      {/* Título principal */}
      <h1 className="text-5xl md:text-6xl font-bold mb-4 text-center">
        Bienvenido a <span className="text-indigo-700">Mi App React</span>
      </h1>

      {/* Subtítulo */}
      <p className="text-lg md:text-xl mb-6 text-center max-w-xl">
        Esta es la página principal pública de tu aplicación. Aquí puedes mostrar
        información general, enlaces a login o registro, o promociones importantes.
      </p>

      {/* Botones de acción */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button className="px-6 py-3 bg-indigo-700 text-white rounded-xl hover:bg-indigo-800 transition">
          Comenzar
        </button>
        <button className="px-6 py-3 border border-indigo-700 text-indigo-700 rounded-xl hover:bg-indigo-100 transition">
          Más Información
        </button>
      </div>

      {/* Imagen decorativa opcional */}
      <div className="mt-10">
        <img
          src="/assets/home-illustration.svg"
          alt="Ilustración principal"
          className="w-80 md:w-96"
        />
      </div>
    </div>
    );
}

export default HomePage