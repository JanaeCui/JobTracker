from app.models import board
from flask import Blueprint, request, jsonify
from flask_login import current_user
from ..models import db, Board

board_route = Blueprint('boards', __name__, url_prefix='')


@board_route.route('/api/boards/')
def get_boards():
    allBoards = Board.query.filter(Board.user_id == current_user.id).all()
    return jsonify([board.to_dict() for board in allBoards])


@board_route.route('/api/boards/<int:id>', methods=['PUT'])
def put_username(id):
    board = Board.query.filter(Board.id == id).one()
    board.name = request.json['name']
    db.session.commit()
    return board.to_dict()


@board_route.route('/api/boards/post/', methods=['POST'])
def post_board():

    board = Board(
        name=request.json['name'],
        user_id=current_user.id,
    )
    db.session.add(board)
    db.session.commit()
    return board.to_dict()


@board_route.route('/api/boards/<int:id>', methods=['DELETE'])
def delete_board(id):
    board = Board.query.get_or_404(id)
    db.session.delete(board)
    db.session.commit()
    return {"id": board.id}
