import React from "react";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

const main = [
    { setScaff: 'Set Scaff', type: 'Main' },
    { paperWire: 'Paper/Wire', type: 'Main' },
    { housewrap: 'Housewrap', type: 'Main' },
    { lathInspection: 'Lath Inspection', type: 'Secondary' },
    { weatherBarrierInspection: 'Weather Barrier Inspection', type: 'Secondary' },
    { tentHeat: 'Tent & Heat', type: 'Secondary' },
    { stuccoBrown: 'Stucco Brown', type: 'Main' },
    { watering: 'Watering', type: 'Secondary' },
    { jChannel: 'J-Channel', type: 'Main' },
    { siding: 'Siding', type: 'Main' },
    { specialCorbels: 'Special Corbels', type: 'Secondary' },
    { paint: 'Paint', type: 'Main' },
    { rock: 'Rock', type: 'Main' },
    { brick: 'Brick', type: 'Main' },
    { soffitFascia: 'Soffit/Fascia', type: 'Main' },
    { stuccoColor: 'Stucco Color', type: 'Main' },
    { shutters: 'Shutters', type: 'Secondary' },
    { miscWork: 'Misc. Work', type: 'Secondary' },
    { cleanup: 'Cleanup', type: 'Secondary' },
    { gutters: 'Gutters', type: 'Main' },
    { vpoWork: 'VPO Work', type: 'Secondary' },
    { warrantyWork: 'Warranty Work', type: 'Secondary' },
    { touchUps: 'Touch Ups', type: 'Secondary' },
    { removeScaff: 'Remove Scaff', type: 'Main' },
    { foundationPlaster: 'Foundation Plaster', type: 'Secondary' },
    { finalInspection: 'Final Inspection', type: 'Secondary' },

]


class TaskRadioGroup extends React.Component {


    renderForm(filter) {
        return main.filter(item => { return item.type === filter }).map(item => {
            for (var key in item) {
                // console.log(key, item[key])
                return <FormControlLabel key={key} value={key} control={<Radio />} label={item[key]} />
            }

        })

    }

    render() {
    
        const { onChange, type, filter } = this.props
        console.log(type)

        return (
            <FormControl component="fieldset" >
                <RadioGroup style={{ flexDirection: 'row', marginLeft: 15 }}
                    value={type}
                    onChange={(e) => { onChange(e) }}
                >
                    {this.renderForm(filter)}
                </RadioGroup>
            </FormControl>
        )
    }
}

export default TaskRadioGroup;