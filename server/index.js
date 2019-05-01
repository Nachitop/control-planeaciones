const express=require('express');
const app= express();
const cors=require('cors')
const {mongoose}=require('./database');
//settings
app.set('port', process.env.PORT||4000);

//middlewares
app.use(express.json());
app.use(cors())
//routes
app.use('/api/alumno',require('./routes/alumno.route'))
app.use('/api/carrera',require('./routes/carrera.route'))
app.use('/api/coordinador',require('./routes/coordinador.route'))
app.use('/api/grupo',require('./routes/grupo.route'))
app.use('/api/materia',require('./routes/materia.route'))
app.use('/api/profesor',require('./routes/profesor.route'))
app.use('/api/usuario',require('./routes/usuario.route'))
app.use('/api/plan',require('./routes/plan.route'));
app.use('/api/horario',require('./routes/horario.route'));

//materia
app.use('/api/aa',require('./routes/areaAcademica.route'));
app.use('/api/competencia',require('./routes/competencia.route'));
app.use('/api/actividad',require('./routes/actividad.route'));
app.use('/api/pe',require('./routes/programaEstudio.route'));
app.use('/api/avances',require('./routes/avances.route'));
//Startin' server
app.listen(app.get('port'),()=>{
    console.log("server on port",app.get('port'));
});