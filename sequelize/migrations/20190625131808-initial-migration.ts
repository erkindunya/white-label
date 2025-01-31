'use strict';
import runner from '../runner'

export default {
  up: (queryInterface, Sequelize) => {
    const CREATE_ARTIST = () => (
      queryInterface.createTable('artist', {
        artist_id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          primaryKey: true
        },
        artist_name: {
          type: Sequelize.STRING(250),
          allowNull: false
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
        }
      })
    )

    const CREATE_VINYL = () => (
      queryInterface.createTable('vinyl', {
        vinyl_id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          primaryKey: true
        },
        name: {
          type: Sequelize.STRING(250),
          allowNull: false
        },
        artist_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'artist',
            key: 'artist_id'
           },
          onDelete: 'cascade',
          onUpdate: 'cascade'
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
        }
      })
    )

    return runner.run([
      () => CREATE_ARTIST(),
      () => CREATE_VINYL()
    ])
  },

  down: (queryInterface, Sequelize) => {
    return runner.run([
      () => queryInterface.dropTable('vinyl'),
      () => queryInterface.dropTable('artist')
    ])
  }
};
